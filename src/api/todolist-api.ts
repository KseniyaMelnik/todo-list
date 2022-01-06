import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '22f8a0e5-ae9d-464b-9c50-12afa6acaa39'
    }
})

export const todolistAPI = {

    getTodo() {
        return instance.get<Array<TodoType>>('todo-lists')
    },

    createTodo(title: string) {
        return instance.post<ResponseType<{item:TodoType}>>('todo-lists', {title})
    },

    deleteTodo(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)

    },

    updateTodo(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title: title})
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





