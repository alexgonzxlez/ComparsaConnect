import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

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
        updateSearchData: (state, action) => {
            const updatedUser = action.payload;
            state.searchdata = state.searchdata.map(user => {
                if (user.id === updatedUser.id) {
                    return {
                        ...user,
                        friend_status: updatedUser.friend_status
                    };
                }
                return user;
            });
        },
    }
});

// Action creators are generated for each case reducer function
export const { startLoading, setSearchdata, updateSearchData } = friendshipSlice.actions

export const friendshipReducer = friendshipSlice.reducer