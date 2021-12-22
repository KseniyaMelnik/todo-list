import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useCallback, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton, List, ListItem, Typography} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

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

export const Todolist = React.memo((props: TodolistPropsType) => {

    let tasksForRender: Array<TaskType> =  props.tasks;
    if (props.filter === "active") {
        tasksForRender = tasksForRender.filter(t => t.isDone === false)
    }
    if (props.filter === "completed") {
        tasksForRender = tasksForRender.filter(t => t.isDone === true)
    }
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])
    const removeTask = useCallback((taskId: string)=>{
        props.removeTask(taskId, props.id)
    }, [props.removeTask, props.id])
    const changeTaskStatus = useCallback((taskId: string, newStatus: boolean)=> {
        props.changeTaskStatus(taskId, newStatus, props.id)
    }, [props.changeTaskStatus, props.id])
    const changeTaskTitle = useCallback((taskID: string, newTitle: string )=>{
        props.changeTasksTitle (taskID, newTitle, props.id)
    }, [props.changeTasksTitle, props.id])

    const tasksJSXElements = tasksForRender.map(task => {
        return <Task task={task} removeTask={removeTask} changeTaskStatus={changeTaskStatus} changeTasksTitle={changeTaskTitle} />
    })


    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id),[props.changeFilter,props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id),[props.changeFilter,props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id),[props.changeFilter,props.id])

    const allBtnClass = (props.filter === "all") ? "secondary" : "primary"
    const activeBtnClass = (props.filter === "active") ? "secondary" : "primary"
    const completedBtnClass = (props.filter === "completed") ? "secondary" : "primary"

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(title, props.id)
    }, [props.changeTodolistTitle, props.id])

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
})
