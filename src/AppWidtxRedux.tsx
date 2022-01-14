import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import "@fontsource/roboto";
import {
    AddTodoListAC, addTodolistsTC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC, fetchTodolistsTC,
    RemoveTodolistAC, removeTodolistsTC,
} from "./store/todoLists-reducer";
import {
    addTaskAC,
    addTaskTC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    removeTasksTC, updateTaskStatusTC, updateTaskTitleTC
} from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";
import {TaskStatuses, TaskType} from "./api/todolist-api";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function AppWidthRedux() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    //BLL:

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType> (state => state.tasks)
    const dispatch = useDispatch();


    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    },[dispatch])
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTasksTC(todoListID, taskID))
    }, [dispatch])
    const changeFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID, title))
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskStatusTC (taskID, status, todoListID))
    }, [dispatch])
    const changeTasksTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(updateTaskTitleTC(taskID, title, todoListID))
    }, [dispatch])
    const removeTodolist =useCallback((todoListID: string) => {
        dispatch(removeTodolistsTC(todoListID))

    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistsTC(title))
    }, [dispatch])

    // UI:
    const todoListsComponents = todolists.map(tl => {

        return (
            <Grid item>
        <Paper elevation={8} style={{padding: "20px"}}>
        <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasks[tl.id]}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            filter={tl.filter}
            changeTaskStatus={changeStatus}
            removeTodolist={removeTodolist}
            changeTasksTitle={changeTasksTitle}
            changeTodolistTitle={changeTodolistTitle}
        />
        </Paper>
            </Grid>)
    })

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar style={{justifyContent: "space-between"}}>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        Todolists
                    </Typography>
                    <Button color="inherit" variant={"outlined"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: "29px 0"}}>
            <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={4}>
            {todoListsComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default AppWidthRedux;
