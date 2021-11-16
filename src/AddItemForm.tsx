import React, {ChangeEvent, ChangeEventHandler, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = (props: AddItemFormPropsType ) => {
    const errorMsgStyles = {backgroundColor:'red', color:'white', fontWeight: 900}
    const errorInputStyles = {border: '2px solid red', outline: "none"}
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
        setError(false);
        if (e.key === "Enter") {
            addItem()
        }
    }
    const errorMessage = error && <div style={errorMsgStyles}>Title is required!</div>

    return (
        <div>
            <input
                style={error ? errorInputStyles : undefined}
                value={title}
                placeholder={'Enter title...'}
                onChange={changeTitle}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    )
}