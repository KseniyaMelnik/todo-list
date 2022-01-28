import React, {useCallback, useEffect} from 'react';
import './App.css';
import {Todolist} from './../components/Todolist/Todolist';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {
    AppBar,
    Button,
    Container,
    Grid,
    IconButton,
    LinearProgress,
    Paper,
    Toolbar,
    Typography
} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import "@fontsource/roboto";
import {
    addTodolistsTC,
    ChangeTodoListFilterAC,
    fetchTodolistsTC,
    removeTodolistsTC, TodolistDomainType, updateTodoTitleTC,
} from "../store/todoLists-reducer";
import {
    addTaskTC,
    removeTasksTC, TaskDomainType, updateTaskStatusTC, updateTaskTitleTC
} from "../store/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, useAppSelector} from "../store/store";
import {TaskStatuses, TaskType} from "../api/todolist-api";
import {RequestStatusType} from "../store/app-reducer";
import {ErrorSnackbar} from "../components/ErrorSnackbar/ErrorSnackbar";
import {TodolistList} from "../components/TodoListList/TodoListList";
import {Navigate, Route, Routes} from "react-router-dom";
import {Login} from "../components/Login/Login";

export type FilterValuesType = "all" | "active" | "completed"

export type TodolistType = {
    id: string,
    title: string,
    filter: FilterValuesType

}

export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}


function AppWidthRedux() {

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])

    //BLL:

    const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch();
    const status = useAppSelector<RequestStatusType>((state)=>state.app.status)


    const addTask = useCallback((title: string, todoListID: string) => {
        dispatch(addTaskTC(todoListID, title))
    }, [dispatch])
    const removeTask = useCallback((taskID: string, todoListID: string) => {
        dispatch(removeTasksTC(todoListID, taskID))
    }, [dispatch])
    const changeFilter = useCallback((filter: FilterValuesType, todoListID: string) => {
        dispatch(ChangeTodoListFilterAC(todoListID, filter))
    }, [dispatch])
    const changeTodolistTitle = useCallback((title: string, todoListID: string) => {
        dispatch(updateTodoTitleTC(todoListID, title))
    }, [dispatch])

    const changeStatus = useCallback((taskID: string, status: TaskStatuses, todoListID: string) => {
        dispatch(updateTaskStatusTC(taskID, status, todoListID))
    }, [dispatch])
    const changeTasksTitle = useCallback((taskID: string, title: string, todoListID: string) => {
        dispatch(updateTaskTitleTC(taskID, title, todoListID))
    }, [dispatch])
    const removeTodolist = useCallback((todoListID: string) => {
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
                        entityStatus={tl.entityStatus}
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
            <ErrorSnackbar />
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
                {status === 'loading' &&  <LinearProgress color={'secondary'}/>}
            </AppBar>
            <Container fixed>
                <Routes>
                    <Route path={'/'} element={<TodolistList addTodolist={addTodolist} todoListsComponents={todoListsComponents}/>}/>
                    <Route path={'/login'} element={<Login />}/>
                    <Route path="/404" element={<h1>404: PAGE NOT FOUND</h1>}/>
                    <Route path="*" element={<Navigate to={'404'}/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default AppWidthRedux;
