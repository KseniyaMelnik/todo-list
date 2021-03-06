import axios, {AxiosResponse} from 'axios'
import {ResponseType, UpdateTaskModelType} from "./todolist-api";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '1860b8e8-5b0f-42e3-b73c-7abd28b78fff'
    }
})

export const tasksAPI = {

    getTask(todolistId: string) {
        return instance.get<TasksType>(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{item:TaskType}>> (`/todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)

    },

    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<UpdateTaskModelType, AxiosResponse<ResponseType<{ item: TaskType }>>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    }
}

type TaskType= {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

 type TasksType = {
    error: string
    items: Array<TaskType>
    totalCount: number
}

//  type ResponseType<D = {}> = {
//     resultCode: number
//     messages: Array<string>
//     data: D
// }
