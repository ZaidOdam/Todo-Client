import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoState {
    id: string;
    title: string;
    status: "incomplete" | "complete";
    createAt: string;
}

const getInitialTodo = (): TodoState[] => {
    const localTodoList = window.localStorage.getItem("todoList");
    if (localTodoList) {
        return JSON.parse(localTodoList);
    }
    return [];
};

const initialState: TodoState[] = getInitialTodo();

export const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        addTodo: (state: TodoState[], action: PayloadAction<TodoState>) => {
            state.push(action.payload);
            window.localStorage.setItem("todoList", JSON.stringify(state));
        },
        deleteTodo: (state: TodoState[], action: PayloadAction<string>) => {
            const updatedState = state.filter((todo) => {
                return todo.id !== action.payload;
            });
            window.localStorage.setItem(
                "todoList",
                JSON.stringify(updatedState),
            );
            return updatedState;
        },
        updateTodo: (
            state: TodoState[],
            action: PayloadAction<{
                id: string;
                title: string;
                status: "incomplete" | "complete";
            }>,
        ) => {
            const updatedState = state.map((todo) => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        title: action.payload.title,
                        status: action.payload.status,
                    };
                }
                return todo;
            });
            window.localStorage.setItem(
                "todoList",
                JSON.stringify(updatedState),
            );
            return updatedState;
        },
    },
});

export type { TodoState };
export const { addTodo, deleteTodo, updateTodo } = todoSlice.actions;
export default todoSlice.reducer;
