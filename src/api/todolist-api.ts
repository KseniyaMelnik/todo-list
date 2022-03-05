import axios, {AxiosResponse} from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1860b8e8-5b0f-42e3-b73c-7abd28b78fff'
    }
})
type LoginParamsType = {
    email: string,
    password: string,
    rememberMe?: boolean,
    captcha?: string
}

export const authAPI = {
    login(data: LoginParamsType) {
        return instance.post<LoginParamsType, AxiosResponse<ResponseType<{userId: number}>>>('/auth/login', data)
    },
    me() {
        return instance.get<ResponseType<{ data: ResponseMeType}>>('/auth/me')
    },
    logout(){
        return instance.delete<ResponseType>('/auth/login')
    }

}
// {
//     resultCode: 1
//     messages: ['Something wrong'],
//         data: {}
// }

type ResponseMeType = {
    id: number,
    email: string,
    login: string,
}

export const todolistAPI = {

    getTodo() {
        return instance.get<Array<TodolistType>>('todo-lists')
    },

    createTodo(title: string) {
        return instance.post<ResponseType<{item:TodolistType}>>('todo-lists', {title})
    },

    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)

    },

    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
    }
}


// types
export type TodolistType = {
    id: string
    title: string
    addedDate: string
    order: number
}
export type FieldsErrorsType = {field: string, error: string }
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors?: Array<FieldsErrorsType>
    data: D
}


export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

