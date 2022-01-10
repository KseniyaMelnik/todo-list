import React, {useEffect, useState} from 'react'
import {tasksAPI} from "../api/task-api";
export default {
    title: 'API'
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todoID = "70dd39ad-a565-4ba3-ad17-cc219bea0a4e"
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
        const todolistId = "70dd39ad-a565-4ba3-ad17-cc219bea0a4e"
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

        const todolistId = '70dd39ad-a565-4ba3-ad17-cc219bea0a4e';
        const taskId = 'eefce6c3-b0af-4050-9cca-924bf50291e6'
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

        const todolistId = '70dd39ad-a565-4ba3-ad17-cc219bea0a4e'
        const taskId = '8cd4f5bb-3d9f-48e1-a9b7-f63d77000bfd'
        tasksAPI.updateTask(todolistId, taskId, 'new task for third todo')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}

