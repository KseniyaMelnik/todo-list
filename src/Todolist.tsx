import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string, todoListID: string) => void,
    changeFilter: (filter: FilterValuesType, todoListID: string) => void,
    addTask: (title: string, todoListID: string) => void,
    changeTaskStatus: (taskID: string, isDone: boolean, todoListID: string) => void,
    removeTodolist: (todoListID: string) => void
}

export function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const tasksJSXElements = props.tasks.map(task => {
        const onClickHandler = () => props.removeTask(task.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)

        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    onChange={onChangeHandler}
                    type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })
    const addTask = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addTask(trimTitle, props.id)
            setTitle("")
        } else {
            setError("Title is required")
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.key === "Enter") {
            addTask()
        }
    }
    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const allBtnClass = (props.filter === "all") ? "active-filter" : ""
    const activeBtnClass = (props.filter === "active") ? "active-filter" : ""
    const completedBtnClass = (props.filter === "completed") ? "active-filter" : ""

    const removeTodolist = ()=>{props.removeTodolist(props.id)}

    return <div>
        <h3>{props.title} <button onClick={removeTodolist}>x</button></h3>
        <div>
            <input
                className={error ? 'error' : ""}
                value={title}
                placeholder={'Enter your task...'}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
        <ul>
            {tasksJSXElements}
        </ul>
        <div>
            <button
                className={allBtnClass}
                onClick={onAllClickHandler}>All
            </button>
            <button
                className={activeBtnClass}
                onClick={onActiveClickHandler}>Active
            </button>
            <button
                className={completedBtnClass}
                onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
