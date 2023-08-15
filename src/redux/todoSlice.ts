import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
    id: string;
    title: string;
    status: "incomplete" | "complete";
    createAt: string;
}

interface InitialState {
    filterStatus: "all" | "incomplete" | "complete";
    todoList: TodoState[];
}

const getInitialTodo = (): TodoState[] => {
    const localTodoList = window.localStorage.getItem("todoList");
    if (localTodoList) {
        return JSON.parse(localTodoList);
    }
    return [];
};

const initialState: InitialState = {
    filterStatus: "all",
    todoList: getInitialTodo(),
};

function saveTodoListToLocalStorage(todoList: TodoState[]) {
    window.localStorage.setItem("todoList", JSON.stringify(todoList));
}

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state: InitialState, action: PayloadAction<TodoState>) => {
            state.todoList.push(action.payload);
            saveTodoListToLocalStorage(state.todoList);
        },
        deleteTodo: (state: InitialState, action: PayloadAction<string>) => {
            const updatedTodoList = state.todoList.filter((todo) => {
                return todo.id !== action.payload;
            });
            saveTodoListToLocalStorage(updatedTodoList);
            return {
                ...state,
                todoList: updatedTodoList,
            };
        },
        updateTodo: (
            state: InitialState,
            action: PayloadAction<{
                id: string;
                title: string;
                status: "incomplete" | "complete";
            }>,
        ) => {
            const updatedTodoList = state.todoList.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        title: action.payload.title,
                        status: action.payload.status,
                    };
                }
                return todo;
            });
            saveTodoListToLocalStorage(updatedTodoList);
            return {
                ...state,
                todoList: updatedTodoList,
            };
        },
        updateFilterStatus: (
            state: InitialState,
            action: PayloadAction<"all" | "incomplete" | "complete">,
        ) => {
            state.filterStatus = action.payload;
        },
    },
});

export type { TodoState };
export const { addTodo, deleteTodo, updateTodo, updateFilterStatus } =
    todoSlice.actions;
export default todoSlice.reducer;
