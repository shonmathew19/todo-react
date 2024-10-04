import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        completedState: [],
        importantState:[]

    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({ id: Date.now(), text: action.payload});
        },
        deleteTodo: (state, action) => {
            const itemToDelete = action.payload;
            state.todos = state.todos.filter(item => item.id !== itemToDelete);
        },
        completedTodo: (state, action) => {
            const todoToComplete = state.todos.find(todo => todo.id === action.payload.id);
            if (todoToComplete) {
                
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
                state.completedState.push(todoToComplete);
            } 
        },
        markAsImportant: (state, action) => { 
            const todoToImportant = state.todos.find(todo => todo.id === action.payload.id);
            if (todoToImportant) {
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
                state.importantState.push(todoToImportant);
            }
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todoToUpdate = state.todos.find(todo => todo.id === id);
            if (todoToUpdate) {
                todoToUpdate.text = text; 
            }
        }
    }
})

export const { addTodo, deleteTodo, completedTodo,todoUpcoming,markAsImportant,updateTodo  } = todoSlice.actions;
export default todoSlice.reducer;
