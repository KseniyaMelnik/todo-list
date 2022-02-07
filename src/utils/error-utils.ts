import {InitialStateType, setAppErrorAC, setAppStatusAC} from '../store/app-reducer';
import {Dispatch, EmptyObject} from 'redux';
import {ResponseType, TaskType} from '../api/todolist-api';
import {ThunkDispatch} from "redux-thunk";
import {
    AddTodoListAT, changeTodolistEntityStatusAT, ChangeTodoListFilterAT,
    ChangeTodolistTitleAT,
    RemoveTodoListAT,
    SetTodolistsActionType,
    TodolistDomainType
} from "../store/todoLists-reducer";
import {TasksStateType} from "../App/AppWidtxRedux";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ThunkDispatch<EmptyObject & { app: InitialStateType; todolists: Array<TodolistDomainType>; tasks: TasksStateType }, unknown, AddTodoListAT | RemoveTodoListAT | SetTodolistsActionType | ChangeTodolistTitleAT | ChangeTodoListFilterAT  | changeTodolistEntityStatusAT | any>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC({error: data.messages[0]}))
    } else {
        dispatch(setAppErrorAC({error: 'Some error occurred'}))
    }
    dispatch(setAppStatusAC({status: 'failed'}))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: Dispatch) => {
    dispatch(setAppErrorAC({error: error.message}))
    dispatch(setAppStatusAC({status: 'failed'}))
}

