import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useCallback, useState} from 'react';
import {TaskType} from "./Todolist";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskID: string) => void,
    changeTaskStatus: (taskID: string, isDone: boolean) => void,
    changeTasksTitle: (taskID: string, title: string) => void,
    todolistId: string
}

export const Task = React.memo(({task, removeTask , changeTaskStatus, changeTasksTitle, todolistId}: TaskPropsType) => {

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(task.id, e.currentTarget.checked)
    const changeTitle = useCallback( (title: string) => {
        changeTasksTitle(task.id, title)}, [changeTasksTitle, task.id])

    return <div key={task.id} className={task.isDone ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            onChange={onChangeHandler}
            checked={task.isDone}/>
        <EditableSpan setNewTitle={changeTitle} title={task.title}/>
        <IconButton onClick={onClickHandler}>
            <Delete fontSize={"small"}/>
        </IconButton>
    </div>

})
