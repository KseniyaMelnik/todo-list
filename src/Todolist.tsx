import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    changeTasksTitle: (taskID: string, title: string, todoListID: string) => void,
    changeTodolistTitle: (title: string, todoListID: string) => void

}

export function Todolist(props: TodolistPropsType) {

    const tasksJSXElements = props.tasks.map(task => {
        const onClickHandler = () => props.removeTask(task.id, props.id)
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.id)
        const changeTitle = (title: string) => {
            props.changeTasksTitle(task.id, title, props.id)
        }
        return (
            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                <input
                    onChange={onChangeHandler}
                    type="checkbox" checked={task.isDone}/>
                <EditableSpan setNewTitle={changeTitle} title={task.title}/>
                <button onClick={onClickHandler}>x</button>
            </li>
        )
    })
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const allBtnClass = (props.filter === "all") ? "active-filter" : ""
    const activeBtnClass = (props.filter === "active") ? "active-filter" : ""
    const completedBtnClass = (props.filter === "completed") ? "active-filter" : ""

    const removeTodolist = ()=>{props.removeTodolist(props.id)}
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} setNewTitle={changeTodolistTitle}/>
             <button onClick={removeTodolist}>x</button></h3>
        <AddItemForm addItem={addTask} />

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
