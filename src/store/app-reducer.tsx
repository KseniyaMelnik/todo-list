export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
export type ErrorType = string| null

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as ErrorType
}

export type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        case 'APP/SET-ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

type ActionsType = setAppStatusAT
    | setAppErrorAT


export const setAppStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)

export type setAppStatusAT = ReturnType<typeof setAppStatusAC>

export const setAppErrorAC = (error: ErrorType) => ({type: 'APP/SET-ERROR', error} as const)

export type setAppErrorAT = ReturnType<typeof setAppErrorAC>