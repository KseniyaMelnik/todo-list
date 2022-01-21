import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {

    const errorMsgStyles = {color: 'red'}
    const [title, setTitle] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }
    const addItem = () => {
        const trimTitle = title.trim()
        if (trimTitle) {
            props.addItem(trimTitle)
            setTitle("")
        } else {
            setError(true)
        }
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== false) {
            setError(false)
        }
        if (e.key === "Enter") {
            addItem()
        }
    }
    const errorMessage = error && <div style={errorMsgStyles}>Title is required!</div>

    return (
        <div>
            <TextField
                size={"small"}
                variant={"outlined"}
                error={!!error}
                value={title}
                placeholder={'Enter title...'}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}
                label={"Title"}
                helperText={errorMessage}
            />
            <IconButton
                onClick={addItem}
                color={"primary"}
                size={"small"}
            >
                <AddBox fontSize={"large"}/>
            </IconButton>
        </div>
    )
})