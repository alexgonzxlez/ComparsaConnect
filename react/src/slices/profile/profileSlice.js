import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { fetchProfileForm } from './thunks';

const initialState = {
    form: { genders: [], banderas: [] },
    refresh: false,
    status: 'idle',
    error: null  
};

export const profileForm = createAsyncThunk('profile/profileForm', async () => {
    return await fetchProfileForm();
})
  

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
    extraReducers: (builder) => {
        builder
            .addCase(profileForm.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(profileForm.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.form = action.payload;
                console.log(state.form)
            })
            .addCase(profileForm.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log("error")
            });
    },

})

// Action creators are generated for each case reducer function
export const { setform, refresh } = profileSlice.actions

export const profileReducer = profileSlice.reducer