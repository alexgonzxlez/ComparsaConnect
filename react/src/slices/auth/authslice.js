import { createSlice } from '@reduxjs/toolkit'
import { getSessionData } from '../../services/Cookies/SessionService';

// Load data from LocalStorage

function getTokenFromSessionStorage() {
  const sessionData = getSessionData();
  return sessionData;
}

const initialState = {
  token: getTokenFromSessionStorage(),
  userData: null,
  error: null,
  errs: [],
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
    },
    setErrors: (state, action) => {
      state.errs = action.payload;
    }
  }
})

export const { setToken, setError, setErrors } = authSlice.actions
export const authReducer = authSlice.reducer