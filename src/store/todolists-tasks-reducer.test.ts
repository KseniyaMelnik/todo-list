import {TasksStateType} from "../App/AppWidtxRedux";
import {AddTodoListAC, TodolistDomainType, todoListsReducer} from "./todoLists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksStateType = {};
    const startTodolistsState: Array<TodolistDomainType> = [];

    const newTodolist =  {id: "newId", title: "What to learn", addedDate: "01.01.2021", order: 1, filter: "all", entityStatus: "idle"}

        const action = AddTodoListAC(newTodolist);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodolistsState = todoListsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolist.id);
    expect(idFromTodolists).toBe(action.todolist.id);
});
