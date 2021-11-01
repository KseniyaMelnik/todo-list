import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void,
    changeFilter: (filter: FilterValuesType) => void,
    addTask: (title: string) => void
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}

export function Todolist(props: TodolistPropsType) {
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const tasksJSXElements = props.tasks.map(task => {
        const onClickHandler = () => props.removeTask(task.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked)

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
            props.addTask(trimTitle)
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
    const onAllClickHandler = () => props.changeFilter("all")
    const onActiveClickHandler = () => props.changeFilter("active")
    const onCompletedClickHandler = () => props.changeFilter("completed")

    const allBtnClass = (props.filter === "all") ? "active-filter" : ""
    const activeBtnClass = (props.filter === "active") ? "active-filter" : ""
    const completedBtnClass = (props.filter === "completed") ? "active-filter" : ""

    return <div>
        <h3>{props.title}</h3>
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
