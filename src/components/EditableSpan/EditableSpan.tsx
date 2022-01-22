import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string
    setNewTitle: (title: string) => void
    disabled?: boolean
}
export const EditableSpan = React.memo((props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState<string>(props.title);
    const onEditMode = () => {
        !props.disabled &&
        setEditMode(true)
    }
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <TextField
                style={{width:"150px"}}
                value={title}
                autoFocus={true}
                onBlur={offEditMode}
                onChange={changeTitle}
            />
            : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
})
