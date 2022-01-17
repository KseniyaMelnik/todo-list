import {v1} from "uuid";
import {todolistAPI, TodolistType} from "../api/todolist-api";
import {AppThunk} from "./store";


export type TodolistActionsType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodolistTitleAT
    | ChangeTodoListFilterAT
    | SetTodolistsActionType

export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST",
    id: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST',
    todolistId: string,
    title: string,
}

type ChangeTodolistTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string,
    title: string
}

type ChangeTodoListFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: FilterValuesType
}
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>
const initialState:Array<TodolistDomainType> = []

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}
export const todoListsReducer = (todolists = initialState, action: TodolistActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'SET-TODOLISTS' : {
            return action.todolists.map( tl => (
                {...tl, filter: "all"}
            ))
        }
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":

          return  [{
                id: action.todolistId,
                title: action.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }, ...todolists]


        case "CHANGE-TODOLIST-TITLE":
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodoListAT => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return { type: 'ADD-TODOLIST', todolistId: v1(), title: title,}
}

export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleAT => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: todolistId, title: title}
}
export const ChangeTodoListFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterAT => {
    return { type: 'CHANGE-TODOLIST-FILTER', id: todolistId, filter: filter}
}
export const setTodolistsAC = (todolists: Array<TodolistType>) => {
    return {type: 'SET-TODOLISTS', todolists} as const
}

export const fetchTodolistsTC = ():AppThunk  => {
    return (dispatch) => {
        todolistAPI.getTodo()
            .then((res) => {
                dispatch(setTodolistsAC(res.data))
            })
    }
}
export const removeTodolistsTC = (todolistId: string):AppThunk => {
    return (dispatch) => {
        todolistAPI.deleteTodo(todolistId)
            .then((res) => {
                dispatch(RemoveTodolistAC(todolistId))
            })
    }
}

export const addTodolistsTC = (title: string):AppThunk => {
    return (dispatch) => {
        todolistAPI.createTodo(title)
            .then((res) => {
                dispatch(AddTodoListAC(title))
            })
    }
}

export const updateTodoTitleTC = (todolistId: string, title: string):AppThunk => {
    return (dispatch) => {
        todolistAPI.updateTodo(todolistId, title)
            // const action = changeTaskStatusAC(id, status, todolistId);
            .then(() => {
                dispatch(ChangeTodolistTitleAC(todolistId, title))
            })
    }
}
