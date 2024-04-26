import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth/authslice'
import { comparsaReducer } from './slices/comparsa/comparsalice'
import { profileReducer } from './slices/profile/profileslice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        comparsa: comparsaReducer,
        profile: profileReducer
    },
})