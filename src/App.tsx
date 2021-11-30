import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import "@fontsource/roboto";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    //BLL:
    const todoListID_1 = v1();
    const todoListID_2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>(
        [
            {id: todoListID_1, title: 'what to learn', filter: 'all'},
            {id: todoListID_2, title: 'what to buy', filter: 'active'}
        ]
    )

    const [tasks, setTasks] = useState<TasksStateType>({
            [todoListID_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Redux", isDone: false}],
            [todoListID_2]: [
                {id: v1(), title: "Meat", isDone: true},
                {id: v1(), title: "Beer", isDone: true},
                {id: v1(), title: "Milk", isDone: false},
                {id: v1(), title: "Bread", isDone: false}],
        }
    )

    const addTask = (title: string, todoListID: string) => {
        const newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        }
        setTasks({
            ...tasks,
            [todoListID]: [newTask, ...tasks[todoListID]]
        })
    }
    const removeTask = (taskID: string, todoListID: string) => {
        tasks[todoListID] = tasks[todoListID].filter(t => t.id !== taskID)
        setTasks({...tasks})
    }
    const changeFilter = (filter: FilterValuesType, todoListID: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, filter} : tl))
    }
    const changeTodolistTitle = (title: string, todoListID: string) => {
        setTodolists(todolists.map(tl => tl.id === todoListID ? {...tl, title} : tl))
    }

    const changeTaskStatus = (taskID: string, isDone: boolean, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, isDone: isDone} : t)
        })
    }
    const changeTasksTitle = (taskID: string, title: string, todoListID: string) => {
        setTasks({
            ...tasks,
            [todoListID]: tasks[todoListID].map(t => t.id === taskID ? {...t, title} : t)
        })
    }
    const removeTodolist = (todoListID: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }
    const addTodolist = (title: string) => {
        const TodoListID = v1()
        const newTodolist: TodolistType = {
            id: TodoListID,
            title,
            filter: 'all'
        };
        setTodolists([newTodolist, ...todolists]);
        setTasks({
            ...tasks,
            [TodoListID]: []
        })
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

export default App;
