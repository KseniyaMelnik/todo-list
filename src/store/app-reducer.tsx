import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "./auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string| null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        case 'APP/SET-INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

type ActionsType = setAppStatusAT
    | setAppErrorAT | setIsInitializedAT


export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type setAppStatusAT = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)

export type setAppErrorAT = ReturnType<typeof setAppErrorAC>

export const setIsInitializedAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZED', isInitialized} as const)

export type setIsInitializedAT = ReturnType<typeof setIsInitializedAC>

export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC(true));
        } else {
        }
    }).finally(()=>{
        dispatch(setIsInitializedAC(true))
    })
}
