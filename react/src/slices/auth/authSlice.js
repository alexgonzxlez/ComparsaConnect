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
  isLoading: false,
}
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.isLoading = true
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.isLoading = false;
      state.error = null;
      state.successMessage = false;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
      state.isLoading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setErrors: (state, action) => {
      state.errs = action.payload;
      state.isLoading = false;
    },
    removeAuthToken: (state,action) => {
      state.token = null;
      state.userData = null;
    },
    setSuccess: (state) => { 
      state.success = true;
      state.isLoading = false;
    },
  }
})

export const { startLoading, setToken, setUserData, setError, setErrors, removeAuthToken, setSuccess } = authSlice.actions
export const authReducer = authSlice.reducer