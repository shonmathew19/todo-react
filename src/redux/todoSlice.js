import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        todos: [],
        completedState: [],
        upcomingState:[],
        importantState:[]

    },
    reducers: {
        addTodo: (state, action) => {
            state.todos.push({ id: Date.now(), text: action.payload, completed: false });
        },
        deleteTodo: (state, action) => {
            const itemToDelete = action.payload;
            state.todos = state.todos.filter(item => item.id !== itemToDelete);
        },
        completedTodo: (state, action) => {
            const todoToComplete = state.todos.find(todo => todo.id === action.payload.id);
            if (todoToComplete) {
                // Remove from todos and add to completedState
                state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
                state.completedState.push(todoToComplete);
            } 
        },
    //     upcomingTodo: (state, action) => {
    //         const todoUpcoming = state.todos.find(todo => todo.id === action.payload.id);
    //         if (todoUpcoming) {
    //             // Remove from todos and add to completedState
    //             state.todos = state.todos.filter(todo => todo.id !== action.payload.id);
    //             state.upcomingState.push(todoUpcoming);
    //         } 
    // }
    }
})

export const { addTodo, deleteTodo, completedTodo,todoUpcoming } = todoSlice.actions;
export default todoSlice.reducer;
