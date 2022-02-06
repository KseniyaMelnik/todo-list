import {Dispatch} from "redux";
import {authAPI} from "../api/todolist-api";
import {setIsLoggedInAC} from "./auth-reducer";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string| null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as ErrorType,
    isInitialized: false
}

const slice = createSlice({
        name: "app",
        initialState: initialState,
        reducers: {
            setAppStatusAC(state, action: PayloadAction<{ status: RequestStatusType }>) {
                {
                    state.status = action.payload.status
                }
            },
            setAppErrorAC(state, action: PayloadAction<{ error: string | null }>) {
                {
                    state.error = action.payload.error
                }
            },
            setIsInitializedAC(state, action: PayloadAction<{ isInitialized: boolean }>) {
                {
                    state.isInitialized = action.payload.isInitialized
                }
            }
        }
    }
)

export type InitialStateType = typeof initialState

export const appReducer = slice.reducer
export const {setAppStatusAC, setAppErrorAC, setIsInitializedAC} = slice.actions


export const initializeAppTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
        debugger
        if (res.data.resultCode === 0) {
            dispatch(setIsLoggedInAC({value: true}));
        } else {
        }
    }).finally(()=>{
        dispatch(setIsInitializedAC({isInitialized: true}))
    })
}
