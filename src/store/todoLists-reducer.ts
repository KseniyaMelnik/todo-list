import {TaskType, todolistAPI, TodolistType} from "../api/todolist-api";
import {AppThunk} from "./store";
import {RequestStatusType, setAppStatusAC} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {ResponseStatusCodes} from "./tasks-reducer";
import {Dispatch} from "redux";


export type TodolistActionsType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodolistTitleAT
    | ChangeTodoListFilterAT
    | SetTodolistsActionType
    | changeTodolistEntityStatusAT

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodoListAT = ReturnType<typeof AddTodoListAC>

export type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

export type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
const initialState:Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType

}
export const todoListsReducer = (todolists = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS' : {
            return action.todolists.map(tl => (
                {...tl, filter: "all", entityStatus: "idle"}
            ))
        }
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            return [{...action.todolist, filter: 'all', entityStatus: 'idle'}, ...todolists]

        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        case 'CHANGE-TODOLIST-ENTITY-STATUS':
            return todolists.map(tl=>tl.id ===action.id ? {...tl, entityStatus: action.entityStatus}: tl)
        default:
            return todolists
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodoListAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}
export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}
export const changeTodolistEntityStatusAC = (id: string, entityStatus: RequestStatusType) => ({
    type: 'CHANGE-TODOLIST-ENTITY-STATUS',
    id,
    entityStatus
} as const)

export type changeTodolistEntityStatusAT = ReturnType<typeof changeTodolistEntityStatusAC>

export const fetchTodolistsTC = ()  => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.getTodo()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC({status: 'succeeded'}))
            })
            .catch((error: AxiosError)=> {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const removeTodolistsTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(changeTodolistEntityStatusAC (todolistId, 'loading'))
        dispatch(setAppStatusAC({status: 'loading'}))
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                if (res.data.resultCode === ResponseStatusCodes.success) {
                    dispatch(setAppStatusAC({status: 'succeeded'}))
                    dispatch(RemoveTodolistAC(todolistId))
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
                    dispatch(AddTodoListAC(res.data.data.item))
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
                    dispatch(ChangeTodolistTitleAC(todolistId, title))
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

