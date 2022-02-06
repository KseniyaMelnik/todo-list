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
import {AddTaskAT, ChangeTaskStatusAT, ChangeTaskTitleAT, RemoveTaskAT, setTasksAT} from "../store/tasks-reducer";

// generic function
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ThunkDispatch<EmptyObject & { app: InitialStateType; todolists: Array<TodolistDomainType>; tasks: TasksStateType }, unknown, RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT | SetTodolistsActionType | setTasksAT  | ChangeTodolistTitleAT | ChangeTodoListFilterAT  | changeTodolistEntityStatusAT | any>) => {
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

