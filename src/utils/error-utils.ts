import {InitialStateType, setAppErrorAC, setAppErrorAT, setAppStatusAC, setAppStatusAT} from '../store/app-reducer';
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
export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ThunkDispatch<EmptyObject & { app: InitialStateType; todolists: Array<TodolistDomainType>; tasks: TasksStateType }, unknown, RemoveTaskAT | AddTaskAT | ChangeTaskStatusAT | ChangeTaskTitleAT | AddTodoListAT | RemoveTodoListAT | SetTodolistsActionType | setTasksAT | setAppErrorAT | ChangeTodolistTitleAT | ChangeTodoListFilterAT | setAppStatusAT | changeTodolistEntityStatusAT>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: {message: string}, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppStatusAC('failed'))
}

type ErrorUtilsDispatchType = Dispatch<setAppErrorAT | setAppStatusAT>