import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    form: { genders: [], banderas: [] },
    refresh: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        refresh: (state, action) => {
            state.refresh = !state.refresh;
        },

    },

})

// Action creators are generated for each case reducer function
export const { refresh } = profileSlice.actions

export const profileReducer = profileSlice.reducer