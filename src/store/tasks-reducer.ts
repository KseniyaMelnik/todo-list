import {TasksStateType} from "../AppWidtxRedux";
import {v1} from "uuid";
import {AddTodoListAT, RemoveTodoListAT, setTodolistsAC, SetTodolistsActionType} from "./todoLists-reducer";
import {Dispatch} from "redux";
import {TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType} from "../api/todolist-api";
import {tasksAPI} from "../api/task-api";
import {AppRootStateType} from "./store";

export type ActionsType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodoListAT
    | RemoveTodoListAT
    | SetTodolistsActionType
    | setTasksAT

type RemoveTaskAT = {
    type: "REMOVE-TASK",
    taskID: string,
    todolistId: string
}

type AddTaskAT = {
    type: 'ADD-TASK',
    task: TaskType
}
type ChangeTaskStatusAT = {
    type: 'CHANGE-TASK-STATUS',
    taskId: string,
    status: TaskStatuses,
    todolistId: string
}
type ChangeTaskTitleAT = {
    type: 'CHANGE-TASK-TITLE',
    taskId: string,
    title: string,
    todolistId: string
}
type setTasksAT = ReturnType<typeof setTasksAC>

const initialState: TasksStateType = {}

export const tasksReducer = (state= initialState, action: ActionsType): TasksStateType => {
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
            return {...state, [action.todolistId]: []}
        case "REMOVE-TODOLIST":
            //let {[action.id]: [], ...newState1} = {...state}
            let newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
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

export const fetchTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTask(todolistId)
            .then((res) => {
                const tasks = res.data.items
                dispatch(setTasksAC(tasks, todolistId))
            })
    }
}

export const removeTasksTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                dispatch(removeTaskAC(taskId, todolistId))
            })
    }
}

export const addTaskTC = (todolistId:string, title:string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todolistId, title)
            .then((res) => {
                dispatch(addTaskAC(res.data.data.item))
            })
    }
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todoId: string,) => (dispatch: Dispatch, getstate: () => AppRootStateType) => {

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

        tasksAPI.updateTask(todoId, taskId, model)
            // const action = changeTaskStatusAC(id, status, todolistId);
            .then(() => {
                dispatch(changeTaskStatusAC(taskId, status, todoId))
            })
    }
}
export const updateTaskTitleTC = (taskId: string, title: string, todoId: string) => (dispatch: Dispatch, getstate: () => AppRootStateType) => {

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

        tasksAPI.updateTask(todoId, taskId, model)
            // const action = changeTaskStatusAC(id, status, todolistId);
            .then(() => {
                dispatch(changeTaskTitleAC(taskId, title, todoId))
            })
    }
}




