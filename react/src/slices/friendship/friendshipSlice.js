import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

const initialState = {
    searchdata: null,
    isLoading: false,
    requestsList: null,
    pendingList: null,
    friends: null,
    totalCount: null
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
        setRequestList: (state, action) => {
            state.requestsList = action.payload;
            state.isLoading = false
        },
        setPendingList: (state, action) => {
            state.pendingList = action.payload;
            state.isLoading = false
        },
        setFriends: (state, action) => {
            state.friends = action.payload;
            state.isLoading = false
        },
        setTotalCount: (state, action) => {
            state.totalCount = action.payload;
            state.isLoading = false
        },
        stopLoading: (state) => {
            state.isLoading = false
        },
    }
});

// Action creators are generated for each case reducer function
export const { startLoading, setSearchdata, updateSearchData, setRequestList, stopLoading, setPendingList, setFriends, setTotalCount } = friendshipSlice.actions

export const friendshipReducer = friendshipSlice.reducer