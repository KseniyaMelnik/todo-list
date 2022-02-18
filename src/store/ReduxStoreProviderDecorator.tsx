import React from 'react'
import {Provider} from 'react-redux'
import {combineReducers} from 'redux'
import {tasksReducer} from '../store/tasks-reducer'
import {todoListsReducer} from '../store/todoLists-reducer'
import {v1} from 'uuid'
import {AppRootStateType, rootReducerType} from '../store/store'
import {appReducer} from "./app-reducer";
import {authReducer} from "./auth-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";
import {HashRouter} from "react-router-dom";

const rootReducer:rootReducerType = combineReducers({
    tasks: tasksReducer,
    todolists: todoListsReducer,
    app: appReducer,
    auth: authReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", entityStatus: "idle", order: 1, addedDate: "01/01/2022"},
        {id: "todolistId2", title: "What to buy", filter: "all", entityStatus: "idle", order: 1, addedDate: "01/01/2022"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", todoListId: "todolistId1", description: 'task', priority: TaskPriorities.Low, status: TaskStatuses.New, entityStatus: "idle", order: 1, addedDate: "01/01/2022", startDate: "01/01/2022", deadline: "01/01/2022" },
            {id: v1(), title: "JS", todoListId: "todolistId1", description: 'task', priority: TaskPriorities.Low, status: TaskStatuses.New, entityStatus: "idle", order: 1, addedDate: "01/01/2022", startDate: "01/01/2022", deadline: "01/01/2022"}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", todoListId: "todolistId2", description: 'task', priority: TaskPriorities.Low, status: TaskStatuses.New, entityStatus: "idle", order: 1, addedDate: "01/01/2022", startDate: "01/01/2022", deadline: "01/01/2022"},
            {id: v1(), title: "React Book", todoListId: "todolistId2", description: 'task', priority: TaskPriorities.Low, status: TaskStatuses.New, entityStatus: "idle", order: 1, addedDate: "01/01/2022", startDate: "01/01/2022", deadline: "01/01/2022"}
        ]
    },
    app: {
        error: null,
        status: "idle",
        isInitialized: false
    },
    auth: {
        isLoggedIn: false
    }
};

export const storyBookStore = configureStore({
    reducer: rootReducer,
    preloadedState: initialGlobalState,
    middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(thunk)
});

export const ReduxStoreProviderDecorator = (storyFn: ()=> React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
export const RouterDecorator = (storyFn: ()=> React.ReactNode) => {
    return <HashRouter>{storyFn()}</HashRouter>
}