import React, {useEffect, useState} from 'react'

import {todolistAPI} from "../api/todolist-api";
export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '22f8a0e5-ae9d-464b-9c50-12afa6acaa39'
    }
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodo()
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "New Title"
        todolistAPI.createTodo (title)
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '870a593a-555f-4838-a692-5d26c4629921';
        todolistAPI.deleteTodo(todolistId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = '096c9d8c-f6df-43d7-9a5a-235b58883eb8'
        todolistAPI.updateTodo(todolistId, 'new title')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

