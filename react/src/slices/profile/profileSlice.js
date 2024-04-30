import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    form: { genders: [], banderas: [] },
    profile: null,
    refresh: false,
    isLoading: false,
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        startLoading: (state) => {
            state.isLoading = true
        },
        setform: (state, action) => {
            state.form = action.payload;
        },
        refresh: (state, action) => {
            state.refresh = !state.refresh;
        },
        setProfile: (state, action) => {
            state.profile = action.payload
            state.isLoading = false
        }

    },

})

// Action creators are generated for each case reducer function
export const { startLoading, setform, refresh, setProfile } = profileSlice.actions

export const profileReducer = profileSlice.reducer