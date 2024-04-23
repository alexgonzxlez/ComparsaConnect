import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authslice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
})