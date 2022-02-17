import {
    AddTodoListAC, ChangeTodoListFilterAC,
    ChangeTodolistTitleAC,
    RemoveTodolistAC, TodolistDomainType,
    todoListsReducer
} from "./todoLists-reducer";
import {v1} from 'uuid';
import {FilterValuesType} from '../App/AppWidtxRedux';

let todolistId1: string;
let todolistId2: string;
let startState: Array<TodolistDomainType>


beforeEach( ()=> {
     todolistId1 = v1();
     todolistId2 = v1();

     startState = [
         {id: todolistId1, title: "What to learn", addedDate: "01.01.2021", order: 1, filter: "all", entityStatus: "idle"},
         {id: todolistId2, title: "What to buy", addedDate: "01.01.2021", order: 2, filter: "all", entityStatus: "idle"},
     ]

})


test('correct todolist should be removed', () => {

    const endState = todoListsReducer(startState, RemoveTodolistAC({todolistId: todolistId1}))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});


test('correct todolist should be added', () => {

    const todolistId3 = v1()

    let newTodolist =  {id: todolistId3, title: "Students", addedDate: "01.01.2021", order: 3, filter: "all", entityStatus: "idle"}


        const endState = todoListsReducer(startState, AddTodoListAC ({todolist: newTodolist}))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("Students");
});


test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const endState = todoListsReducer(startState, ChangeTodolistTitleAC({todolistId:todolistId2 , title: newTodolistTitle}));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const endState = todoListsReducer(startState, ChangeTodoListFilterAC({todolistId: todolistId2, filter: newFilter}));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});
