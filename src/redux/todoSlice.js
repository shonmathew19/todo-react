import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: [],
    reducers: {
        addTodo: (state, action) => {
            state.push({ id: Date.now(), text: action.payload, completed: false })
        },
        deleteTodo: (state, action) => {
            const itemToDelete = action.payload
            return state.filter(item => item.id !== itemToDelete);
        }
    }
})

export const { addTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;