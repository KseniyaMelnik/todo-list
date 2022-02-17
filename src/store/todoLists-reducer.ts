import {todolistAPI, TodolistType} from "../api/todolist-api";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ResponseStatusCodes} from "./tasks-reducer";
import {Dispatch} from "redux";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const initialState:Array<TodolistDomainType> = []

const slice = createSlice({
    name: "todolists",
    initialState: initialState,
    reducers: {
        setTodolistsAC(state, action: PayloadAction<{todolists: Array<TodolistType>}>){
            return action.payload.todolists.map(tl => (
                {...tl, filter: "all", entityStatus: "idle"}
            ))
        },
        RemoveTodolistAC(state, action: PayloadAction<{todolistId: string}>){
            const index = state.findIndex(tl=> tl.id === action.payload.todolistId)
            if (index > -1) {
                state.splice(index, 1)
            }
        },
        AddTodoListAC(state, action: PayloadAction<{todolist: TodolistType}>){
            state.unshift({...action.payload.todolist, filter: 'all', entityStatus: 'idle'})
        },
        ChangeTodolistTitleAC(state, action: PayloadAction<{todolistId: string, title: string}>){
            const index = state.findIndex(tl=> tl.id === action.payload.todolistId)
            state[index].title = action.payload.title
        },
        ChangeTodoListFilterAC(state, action: PayloadAction<{todolistId: string, filter: FilterValuesType}>){
            const index = state.findIndex(tl=> tl.id === action.payload.todolistId)
            state[index].filter = action.payload.filter
        },
        changeTodolistEntityStatusAC(state, action: PayloadAction<{id: string, entityStatus: RequestStatusType}>){
            const index = state.findIndex(tl=> tl.id === action.payload.id)
            state[index].entityStatus = action.payload.entityStatus
        }
    }
})

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType

}
export const todoListsReducer = slice.reducer
export const {setTodolistsAC, RemoveTodolistAC, AddTodoListAC, ChangeTodolistTitleAC, ChangeTodoListFilterAC, changeTodolistEntityStatusAC} = slice.actions


export type changeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export const fetchTodolistsTC = ()  => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.getTodo()
            .then((res) => {
                dispatch(setTodolistsAC({todolists: res.data}))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(changeTodolistEntityStatusAC ({id: todolistId, entityStatus: "loading"}))
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                if (res.data.resultCode === ResponseStatusCodes.success) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(RemoveTodolistAC({todolistId: todolistId}))
                }else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const addTodolistsTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.createTodo(title)
            .then((res) => {
                if (res.data.resultCode === ResponseStatusCodes.success) {
                    dispatch(AddTodoListAC({todolist: res.data.data.item}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError<{item: TodolistType}>(res.data, dispatch)
                }
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const updateTodoTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.updateTodo(todolistId, title)
            // const action = changeTaskStatusAC(id, status, todolistId);
            .then((res) => {
                if (res.data.resultCode === ResponseStatusCodes.success) {
                    dispatch(ChangeTodolistTitleAC({todolistId, title}))
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                } else {
                    handleServerAppError(res.data, dispatch)
                }
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
    }
}

