import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: null,
    isLoading: false,
    bannedUsers: null
};

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            state.isLoading = false
        },
        setBannedUsers: (state, action) => {
            state.bannedUsers = action.payload;
            state.isLoading = false
        },
        stopLoading: (state) => {
            state.isLoading = false
        },
    }
});

export const { setUsers, setBannedUsers, startLoading, stopLoading } = adminSlice.actions;
export const adminReducer = adminSlice.reducer;
