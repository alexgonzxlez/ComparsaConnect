import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  token: null,
  userData: null,
  error: null,
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isloading = false
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
})

export const { setToken, setError } = authSlice.actions
export const authReducer = authSlice.reducer