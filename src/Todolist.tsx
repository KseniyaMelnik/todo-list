import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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
            <ListItem
                divider
                disableGutters
                key={task.id}
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px"
                }}
                className={task.isDone ? "is-done" : ""}>
                <Checkbox
                    color={"primary"}
                    onChange={onChangeHandler}
                    checked={task.isDone}/>
                <EditableSpan setNewTitle={changeTitle} title={task.title}/>
                <IconButton onClick={onClickHandler}>
                    <Delete fontSize={"small"}/>
                </IconButton>
            </ListItem>
        )
    })
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }

    const onAllClickHandler = () => props.changeFilter("all", props.id)
    const onActiveClickHandler = () => props.changeFilter("active", props.id)
    const onCompletedClickHandler = () => props.changeFilter("completed", props.id)

    const allBtnClass = (props.filter === "all") ? "secondary" : "primary"
    const activeBtnClass = (props.filter === "active") ? "secondary" : "primary"
    const completedBtnClass = (props.filter === "completed") ? "secondary" : "primary"

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(title, props.id)
    }

    return <div>
        <Typography
            align={"center"}
            variant={"h6"}
            style={{fontWeight: "bold"}}>
            <EditableSpan
                title={props.title}
                setNewTitle={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </Typography>

        <AddItemForm addItem={addTask}/>

        <List>
            {tasksJSXElements}
        </List>
        <div>
            <ButtonGroup
                variant={'contained'}
                size={'small'}
                disableElevation
            >
                <Button
                    color={allBtnClass}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    color={activeBtnClass}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    color={completedBtnClass}
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </ButtonGroup>
        </div>
    </div>
}
