import React, {useEffect, useState} from 'react'

import {todolistAPI} from "../api/todolist-api";
import {tasksAPI} from "../api/task-api";
export default {
    title: 'API'
}

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '22f8a0e5-ae9d-464b-9c50-12afa6acaa39'
    }
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = "d2b89f75-573a-4e4e-8b28-5091973920e9"
        tasksAPI.getTask(todoID)
            .then((res) => {
                setState(res.data);
            })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "New Task"
        const todolistId = "d2b89f75-573a-4e4e-8b28-5091973920e9"
        tasksAPI.createTask(todolistId, title)
            .then( (res) => {
            setState(res.data);
        } )

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'd2b89f75-573a-4e4e-8b28-5091973920e9';
        const taskId = 'a7bbfefc-c358-432e-8cb9-a9296a1403a5'
        tasksAPI.deleteTask(todolistId, taskId)
            .then( (res) => {
            setState(res.data);
        })

    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {

        const todolistId = 'd2b89f75-573a-4e4e-8b28-5091973920e9'
        const taskId = '2a5f2837-b0cf-4eea-ae69-15977ba13cb5'
        tasksAPI.updateTask(todolistId, taskId, 'JS')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

