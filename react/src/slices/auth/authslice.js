import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    authToken: null,
    userData: null    
  }
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state,action) => {
      state.authToken = action.payload;
      state.isloading = false
    },

  }
})
// Action creators are generated for each case reducer function
export const { setAuthToken } = authSlice.actions
export const authReducer = authSlice.reducer