import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from './tasks-reducer';
import {TasksStateType} from './../App/AppWidtxRedux';
import {AddTodoListAC, RemoveTodolistAC} from "./todoLists-reducer";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";

let startState: TasksStateType


beforeEach( ()=> {
     startState = {
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" },
            { id: "2", title: "JS", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" },
            { id: "3", title: "React", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2", entityStatus: "idle" },
            { id: "2", title: "milk", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2", entityStatus: "idle" },
            { id: "3", title: "tea", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2", entityStatus: "idle" }
        ]
    };

})

test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC( {taskID: "2", todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" },
            { id: "2", title: "JS", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" },
            { id: "3", title: "React", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2", entityStatus: "idle" },
            { id: "3", title: "tea", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2", entityStatus: "idle" }
        ]
    });

});


test('correct task should be added to correct array', () => {

    const newTask =  { id: "4", title: "juce", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2" }

    const endState = tasksReducer(startState, addTaskAC(newTask))

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juce");
})

test('status of specified task should be changed', () => {

    const action = changeTaskStatusAC({taskId: "2", status: TaskStatuses.InProgress, todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.InProgress);
    expect(endState).toEqual({
        "todolistId1": [
            { id: "1", title: "CSS", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" },
            { id: "2", title: "JS", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" },
            { id: "3", title: "React", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId1", entityStatus: "idle" }
        ],
        "todolistId2": [
            { id: "1", title: "bread", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2", entityStatus: "idle" },
            { id: "2", title: "milk", status: TaskStatuses.InProgress, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2", entityStatus: "idle" },
            { id: "3", title: "tea", status: TaskStatuses.New, priority: TaskPriorities.Low, startDate: '01.01.2021', deadline: '31.12.2022', addedDate: '02.01.2021', description: 'it is test', order: 1, todoListId: "todolistId2", entityStatus: "idle" }
        ]
    });
});

test('title of specified task should be changed', () => {

    const action = changeTaskTitleAC({taskId: "2", title: "beer", todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"][1].title).toBe("JS");
    expect(endState["todolistId2"][1].title).toBe("beer");

});

test('new array should be added when new todolist is added', () => {

    const action = AddTodoListAC({todolist: {id: "todolistId3", title: "new todolist", addedDate: "01.02.2021", order: 1}});

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});


test('property with todolistId should be deleted', () => {

    const action = RemoveTodolistAC({todolistId: "todolistId2"});

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


