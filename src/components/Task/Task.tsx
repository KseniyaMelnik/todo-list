import React, {ChangeEvent, useCallback} from 'react';

import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses} from "../../api/todolist-api";
import {TaskDomainType} from "../../store/tasks-reducer";

export type TaskPropsType = {
    task: TaskDomainType
    removeTask: (taskID: string) => void,
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTasksTitle: (taskID: string, title: string) => void,
    todolistId: string
}

export const Task = React.memo(({task, removeTask , changeTaskStatus, changeTasksTitle, todolistId}: TaskPropsType) => {

    const onClickHandler = () => removeTask(task.id)
    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked
        changeTaskStatus(task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, todolistId)
    }, [task.id, todolistId]);
    const changeTitle = useCallback( (title: string) => {
        changeTasksTitle(task.id, title)}, [changeTasksTitle, task.id])

    return <div key={task.id} className={task.status === TaskStatuses.Completed ? 'is-done' : ''}>
        <Checkbox
            color={"primary"}
            onChange={onChangeHandler}
            checked={task.status === TaskStatuses.Completed} />
        <EditableSpan setNewTitle={changeTitle} title={task.title}/>
        <IconButton onClick={onClickHandler} disabled={task.entityStatus === 'loading'}>
            <Delete fontSize={"small"}/>
        </IconButton>
    </div>

})
