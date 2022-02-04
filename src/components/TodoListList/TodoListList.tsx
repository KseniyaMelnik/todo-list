import {Grid} from "@material-ui/core";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import React, {useEffect} from "react";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store/store";
import {fetchTodolistsTC} from "../../store/todoLists-reducer";

type TodoListListPropsType = {
    addTodolist: (title: string)=> void
    todoListsComponents:  JSX.Element[]
}

export const TodolistList = (props: TodoListListPropsType) => {
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state=>state.auth.isLoggedIn)
    const dispatch = useDispatch()

    useEffect (()=>{
        if (!isLoggedIn) {
            return
        }
        dispatch(fetchTodolistsTC())
    }, [])


    if (!isLoggedIn) {
        return <Navigate to={'/login'} />
    }
    return <>
        <Grid container style={{padding: "29px 0"}}>
            <AddItemForm addItem={props.addTodolist}/>
        </Grid>
        <Grid container spacing={4}>
            {props.todoListsComponents}
        </Grid>
    </>
}