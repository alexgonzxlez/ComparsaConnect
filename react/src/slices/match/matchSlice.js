import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    suitors: null,
    isLoading: false,
};

export const matchSlice = createSlice({
    name: 'match',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        setSuitors: (state, action) => {
            state.suitors = action.payload;
            state.isLoading = false
        },
        stopLoading: (state) => {
            state.isLoading = false
        },
    }
});

// Action creators are generated for each case reducer function
export const { setSuitors, startLoading, stopLoading } = matchSlice.actions

export const matchReducer = matchSlice.reducer