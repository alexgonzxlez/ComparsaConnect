import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    messages: null,
    isLoading: false,
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
            state.isLoading = false
        },
        stopLoading: (state) => {
            state.isLoading = false
        },
    }
});

// Action creators are generated for each case reducer function
export const { startLoading, setMessages, stopLoading } = chatSlice.actions

export const chatReducer = chatSlice.reducer