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
  success: false,
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.isloading = false;
      state.error = null;
      state.successMessage = false;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setErrors: (state, action) => {
      state.errs = action.payload;
    },
    removeAuthToken: (state,action) => {
      state.token = null;
      state.userData = null;
    },
    setSuccess: (state) => { 
      state.success = true;
    },
  }
})

export const { setToken, setUserData, setError, setErrors, removeAuthToken, setSuccess } = authSlice.actions
export const authReducer = authSlice.reducer