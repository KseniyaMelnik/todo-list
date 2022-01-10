import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '22f8a0e5-ae9d-464b-9c50-12afa6acaa39'
    }
})

export const tasksAPI = {

    getTask(todolistId: string) {
        return instance.get(`/todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId: string, title: string) {
        return instance.post (`/todo-lists/${todolistId}/tasks`, {title})
    },

    deleteTask(todolistId: string, taskId: string) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`)

    },

    updateTask(todolistId: string, taskId: string, title: string) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: title})
    }
}

type TodoType= {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}





