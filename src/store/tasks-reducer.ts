import {
    AddTodoListAC,
    RemoveTodolistAC,
    setTodolistsAC,
} from "./todoLists-reducer";
import {TaskStatuses, TaskType, UpdateTaskModelType} from "../api/todolist-api";
import {tasksAPI} from "../api/task-api";
import {AppRootStateType} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {Dispatch} from "redux";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType

}
 type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

const initialState: TasksStateType = {}

export const fetchTasksTC = createAsyncThunk('tasks/fetchTasks', (todolistId: string, thunkApi)=>{
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    return tasksAPI.getTask(todolistId)
        .then((res) => {
            const tasks = res.data.items
            thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
            return {tasks, todolistId}
        })
})

export const removeTasksTC = createAsyncThunk('tasks/removeTask', (param: {todolistId: string, taskId: string}, thunkApi)=>{
    thunkApi.dispatch(setAppStatusAC({status: 'loading'}))
    thunkApi.dispatch(changeTaskEntityStatusAC({taskId: param.taskId, entityStatus: "loading", todolistId: param.todolistId}))
    return tasksAPI.deleteTask(param.todolistId, param.taskId)
        .then((res) => {
            thunkApi.dispatch(setAppStatusAC({status: 'succeeded'}))
                return {taskID: param.taskId, todolistId: param.todolistId}
        })
})



const slice = createSlice({
    name: "tasks",
    initialState: initialState,
    reducers: {
        addTaskAC(state, action: PayloadAction<TaskType>){
            state[action.payload.todoListId].unshift({...action.payload, entityStatus: 'idle'})
        },
        changeTaskTitleAC(state, action: PayloadAction<{taskId: string, title: string, todolistId: string}>){
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1){
                tasks[index] = {...tasks[index], title: action.payload.title}
            }
        },
        changeTaskStatusAC(state, action: PayloadAction<{taskId: string, status: TaskStatuses, todolistId: string}>){
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1){
                tasks[index] = {...tasks[index], status: action.payload.status}
            }
        },
        changeTaskEntityStatusAC(state, action: PayloadAction<{todolistId: string, taskId: string, entityStatus: RequestStatusType}>){
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskId);
            if (index > -1){
                tasks[index] = {...tasks[index], entityStatus: action.payload.entityStatus}
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(AddTodoListAC, (state, action)=> {
            state[action.payload.todolist.id] = []
        });
        builder.addCase(RemoveTodolistAC, (state, action)=> {
            delete state[action.payload.todolistId]
        });
        builder.addCase(setTodolistsAC, (state, action) => {
            action.payload.todolists.forEach((tl: any)=> {
                state[tl.id] = []
            })
        })
        builder.addCase(fetchTasksTC.fulfilled, (state, action) => {
            state[action.payload.todolistId] = action.payload.tasks.map((t => ({...t, entityStatus: 'idle'})))

        })
        builder.addCase(removeTasksTC.fulfilled, (state, action) => {
            const tasks = state[action.payload.todolistId];
            const index = tasks.findIndex(t => t.id === action.payload.taskID);
            if (index > -1){
                tasks.splice(index, 1);
            }
        })
    }
})

export const { addTaskAC, changeTaskTitleAC, changeTaskStatusAC, changeTaskEntityStatusAC} = slice.actions
export const tasksReducer = slice.reducer

export enum ResponseStatusCodes {
    success = 0,
    error = 1,
    captcha = 10
}


export const addTaskTC = (todolistId:string, title:string) =>
     (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
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
                dispatch(setAppStatusAC({status: 'idle'}))
            })
}

export const updateTaskStatusTC = (taskId: string, status: TaskStatuses, todoId: string) => (dispatch: Dispatch, getstate: () => AppRootStateType) => {

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
        dispatch(setAppStatusAC({status: "loading"}))
        dispatch(changeTaskEntityStatusAC({todolistId: todoId, taskId, entityStatus: "loading"}))
        tasksAPI.updateTask(todoId, taskId, model)
            // const action = changeTaskStatusAC(id, status, todolistId);
            .then((res) => {
                if (res.data.resultCode === ResponseStatusCodes.success) {
                    dispatch(changeTaskStatusAC({taskId, status, todolistId: todoId}))
                    dispatch(changeTaskEntityStatusAC({todolistId: todoId, taskId, entityStatus: 'idle'}))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                }
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
            .finally(()=>{
                dispatch(setAppStatusAC({status: 'idle'}))
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
        dispatch(setAppStatusAC({status: 'loading'}))
        dispatch(changeTaskEntityStatusAC({todolistId: todoId, taskId, entityStatus: 'loading'}))
        tasksAPI.updateTask(todoId, taskId, model)
            .then(() => {
                dispatch(changeTaskTitleAC({taskId, title, todolistId: todoId}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
                dispatch(changeTaskEntityStatusAC({todolistId: todoId, taskId, entityStatus: 'idle'}))
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
    }
}




