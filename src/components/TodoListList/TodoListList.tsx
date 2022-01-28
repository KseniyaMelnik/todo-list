import {Grid} from "@material-ui/core";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import React from "react";

type TodoListListPropsType = {
    addTodolist: (title: string)=> void
    todoListsComponents:  JSX.Element[]
}

export const TodolistList = (props: TodoListListPropsType) => {

    return <>
        <Grid container style={{padding: "29px 0"}}>
            <AddItemForm addItem={props.addTodolist}/>
        </Grid>
        <Grid container spacing={4}>
            {props.todoListsComponents}
        </Grid>
    </>
}