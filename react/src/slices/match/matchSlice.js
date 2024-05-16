import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    suitors: null,
    isLoading: false,
    page: 1,
    meta: null,
    heart: false,
    accepted: null,
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
        setPage: (state, action) => {
            state.page = action.payload
        },
        setMeta: (state, action) => {
            state.meta = action.payload
        },
        removeSuitor: (state, action) => {
            const idToRemove = parseInt(action.payload);
            state.suitors = state.suitors.filter(suitor => suitor.user_id !== idToRemove);
            if (!state.suitors || state.suitors.length === 0) {
                state.page += 1;
            }
    
        },
        setHeart: (state,action) => {
            state.heart = action.payload
        },
        setAccepted: (state, action) => {
            state.accepted = action.payload;
            state.isLoading = false
        }

    }
});

// Action creators are generated for each case reducer function
export const { setSuitors, startLoading, stopLoading, setPage, setMeta, removeSuitor, setHeart, setAccepted } = matchSlice.actions

export const matchReducer = matchSlice.reducer