import {TasksStateType} from "../App/AppWidtxRedux";
import {AddTodoListAT, RemoveTodoListAT, SetTodolistsActionType} from "./todoLists-reducer";
import {TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {tasksAPI} from "../api/task-api";
import {AppRootStateType, AppThunk} from "./store";
import {setAppErrorAC, setAppErrorAT, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

export type TasksActionsType =
      RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodolistsActionType
    | setTasksAT
    | setAppErrorAT

export type RemoveTaskAT = {
    type: "REMOVE-TASK",
    taskID: string,
    todolistId: string
}

export type AddTaskAT = {
    type: 'ADD-TASK',
    task: TaskType
}
export type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    status: TaskStatuses,
    todolistId: string
}
export type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string
}
export type setTasksAT = ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state= initialState, action: TasksActionsType): TasksStateType => {
    switch (action.type) {
        case 'SET-TASKS': {
            let copyState = {...state}
            copyState[action.todolistId] = action.tasks
            return copyState
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state}
            action.todolists.forEach((tl)=>{
                stateCopy[tl.id] = []
            })
            return stateCopy;
        }
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id !== action.taskID);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }

        case "ADD-TASK":{
            const stateCopy = {...state}
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }


        case "CHANGE-TASK-STATUS":{
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, status: action.status} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case "CHANGE-TASK-TITLE":
            return {...state, [action.todolistId]: state[action.todolistId]
                    .map(t => t.id === action.taskId ? {...t, title: action.title} : t) }
        case "ADD-TODOLIST":
            return {...state, [action.todolist.id]: []}
        case "REMOVE-TODOLIST":
            //let {[action.id]: [], ...newState1} = {...state}
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export enum ResponseStatusCodes {
    success = 0,
    error = 1,
    captcha = 10
}

export const removeTaskAC = (taskID: string, todolistId: string): RemoveTaskAT => {
    return { type: 'REMOVE-TASK', taskID, todolistId} as const
}
export const addTaskAC = (task: TaskType): AddTaskAT => {
    return { type: 'ADD-TASK', task}
}
export const changeTaskStatusAC = (taskId: string, status: TaskStatuses, todolistId: string): ChangeTaskStatusAT => {
    return { type: 'CHANGE-TASK-STATUS', taskId, status, todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleAT => {
    return { type: 'CHANGE-TASK-TITLE', taskId, title, todolistId}
}
export const setTasksAC = (tasks: Array<TaskType>, todolistId: string) => {
    return {type: 'SET-TASKS', tasks, todolistId} as const
}
export type SetTasksActionType  = ReturnType<typeof setTasksAC>

export const fetchTasksTC = (todolistId: string):AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.getTask(todolistId)
            .then((res) => {
                dispatch(setAppStatusAC('succeeded'))
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })

    }
}

export const removeTasksTC = (todolistId: string, taskId: string):AppThunk => {
    return (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                if (res.data.resultCode === ResponseStatusCodes.success) {
                    dispatch(removeTaskAC(taskId, todolistId))
                    dispatch(setAppStatusAC('succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError)=> {
            handleServerNetworkError(error, dispatch)
        })
    }
}

export const addTaskTC = (todolistId:string, title:string):AppThunk =>
     (dispatch) => {
        dispatch(setAppStatusAC('loading'))
        tasksAPI.createTask(todolistId, title)
            .then(res => {
                if (res.data.resultCode === ResponseStatusCodes.success) {
                    const task = res.data.data.item
                    dispatch(addTaskAC(task))
                } else {
                    handleServerAppError<{item:TaskType}>(res.data, dispatch)
                }
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
            .finally(()=>{
                dispatch(setAppStatusAC('idle'))
            })
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todoId: string):AppThunk => (dispatch, getstate: () => AppRootStateType) => {

    const appState = getstate()
    const tasksApp = appState.tasks
    const tasksForCurrentTodo = tasksApp[todoId]
    const currentTask = tasksForCurrentTodo.find((t) => {
        return t.id === taskId
    })

    if (currentTask) {
        const model: UpdateTaskModelType = {
            title: currentTask.title,
            status: status,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline
        }
        dispatch(setAppStatusAC('loading'))
        tasksAPI.updateTask(todoId, taskId, model)
            // const action = changeTaskStatusAC(id, status, todolistId);
            .then((res) => {
                if (res.data.resultCode === ResponseStatusCodes.success) {
                    dispatch(changeTaskStatusAC(taskId, status, todoId))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
            .finally(()=>{
                dispatch(setAppStatusAC('idle'))
            })
    }
}
export const updateTaskTitleTC = (taskId: string, title: string, todoId: string):AppThunk => (dispatch, getstate: () => AppRootStateType) => {

    const appState = getstate()
    const tasksApp = appState.tasks
    const tasksForCurrentTodo = tasksApp[todoId]
    const currentTask = tasksForCurrentTodo.find((t) => {
        return t.id === taskId
    })

    if (currentTask) {
        const model: UpdateTaskModelType = {
            title: title,
            status: currentTask.status,
            description: currentTask.description,
            priority: currentTask.priority,
            startDate: currentTask.startDate,
            deadline: currentTask.deadline
        }
        dispatch(setAppStatusAC('loading'))
        tasksAPI.updateTask(todoId, taskId, model)
            .then(() => {
                dispatch(changeTaskTitleAC(taskId, title, todoId))
                dispatch(setAppStatusAC('succeeded'))
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
    }
}




