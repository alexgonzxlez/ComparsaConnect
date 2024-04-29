import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { fetchProfileForm, delProfile } from './thunks';

const initialState = {
    form: { genders: [], banderas: [] },
    refresh: false,
    status: 'idle',
    error: null  
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfileForm.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProfileForm.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log(action.payload)
                state.form = action.payload;
                console.log(state.form)
            })
            .addCase(fetchProfileForm.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
                console.log("error")
                console.log(state.error)
            })
            .addCase(delProfile.pending, (state) => {
                state.status = 'loading';
                console.log("loading")
              })
              .addCase(delProfile.fulfilled, (state, action) => {
                state.status = 'succeeded';
                  state.refresh = !state.refresh; 
                  console.log(action.payload)
              })
              .addCase(delProfile.rejected, (state, action) => {
                state.status = 'failed';
                  state.error = action.error.message;
                  console.log(state.error)
              });
        
    },

})

// Action creators are generated for each case reducer function
export const { setform, refresh } = profileSlice.actions

export const profileReducer = profileSlice.reducer