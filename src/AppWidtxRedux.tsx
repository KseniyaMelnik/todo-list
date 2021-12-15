import React from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import "@fontsource/roboto";
import {
    AddTodoListAC,
    ChangeTodoListFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC,
} from "./store/todoLists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./store/store";

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
    //BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType> (state => state.tasks)
    const dispatch = useDispatch();


    const addTask = (title: string, todoListID: string) => {
        dispatch(addTaskAC(title, todoListID))
    }
    const removeTask = (taskID: string, todoListID: string) => {
        dispatch(removeTaskAC(taskID, todoListID))
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    }
    const changeTodolistTitle = (title: string, todoListID: string) => {
        dispatch(ChangeTodolistTitleAC(todoListID, title))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        dispatch(changeTaskStatusAC (taskID, isDone, todoListID))
    }
    const changeTasksTitle = (taskID: string, title: string, todoListID: string) => {
        dispatch(changeTaskTitleAC(taskID, title, todoListID))
    }
    const removeTodolist = (todoListID: string) => {
        dispatch(RemoveTodolistAC(todoListID))

    }
    const addTodolist = (title: string) => {
        dispatch(AddTodoListAC(title))
    }

    // UI:
    const todoListsComponents = todolists.map(tl => {
        let tasksForRender: Array<TaskType> = tasks[tl.id]
        if (tl.filter === "active") {
            tasksForRender = tasks[tl.id].filter(t => t.isDone === false)
        }
        if (tl.filter === "completed") {
            tasksForRender = tasks[tl.id].filter(t => t.isDone === true)
        }

        return (
            <Grid item>
        <Paper elevation={8} style={{padding: "20px"}}>
        <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForRender}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            filter={tl.filter}
            changeTaskStatus={changeTaskStatus}
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
