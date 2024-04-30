import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    searchdata: null,
    isLoading: false
};

export const friendshipSlice = createSlice({
    name: 'friendship',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        setSearchdata: (state, action) => {
            state.searchdata = action.payload;
            state.isLoading = false
        },

    },
});

// Action creators are generated for each case reducer function
export const { startLoading, setSearchdata } = friendshipSlice.actions

export const friendshipReducer = friendshipSlice.reducer