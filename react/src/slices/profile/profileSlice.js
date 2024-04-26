import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    form: { genders: [], banderas: [] },
    refresh: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setform: (state, action) => {
            state.form = action.payload;
        },
        refresh: (state, action) => {
            state.refresh = !state.refresh;
        },

    },

})

// Action creators are generated for each case reducer function
export const { setform, refresh } = profileSlice.actions

export const profileReducer = profileSlice.reducer