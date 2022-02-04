import {TasksActionsType, tasksReducer} from './tasks-reducer';
import {TodolistActionsType, todoListsReducer} from './todoLists-reducer';
import { combineReducers} from 'redux';
import thunk, {ThunkAction} from "redux-thunk";
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {configureStore} from "@reduxjs/toolkit";

// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})
//export const store = createStore(rootReducer, applyMiddleware(thunk));
export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
})

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// все типы экшенов для всего App
export type AppActionsType = TasksActionsType | TodolistActionsType

export const useAppSelector: TypedUseSelectorHook<AppRootStateType>= useSelector


export type AppThunk <ReturnType = void> = ThunkAction<void, AppRootStateType, unknown, AppActionsType>
// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;

