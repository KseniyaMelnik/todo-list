import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    setNewTitle: (title: string) => void
}
export const EditableSpan = (props: EditableSpanType) => {
    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState<string>(props.title);
    const onEditMode = () => setEditMode(true)
    const offEditMode = () => {
        setEditMode(false)
        props.setNewTitle(title)
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
        ? <input
            value={title}
            autoFocus={true}
            onBlur={offEditMode}
            onChange={changeTitle}
            />
        : <span onDoubleClick={onEditMode}>{props.title}</span>
    )
}
