import { tasksReducer} from './tasks-reducer';
import { todoListsReducer} from './todoLists-reducer';
import { combineReducers} from 'redux';
import thunk from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";
import {appReducer} from "./app-reducer";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})

export type rootReducerType = typeof rootReducer

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

export type AppRootStateType = ReturnType<typeof rootReducer>

//export type AppActionsType = TasksActionsType | TodolistActionsType

export const useAppSelector: TypedUseSelectorHook<AppRootStateType>= useSelector


//export type AppThunk <ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>

// @ts-ignore
window.store = store;

export type AppDispatchType = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatchType>()