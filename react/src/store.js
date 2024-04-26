import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authslice'
import { comparsaReducer } from './slices/comparsa/comparsalice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        comparsa: comparsaReducer,
    },
})