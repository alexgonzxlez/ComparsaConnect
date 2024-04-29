import { createAsyncThunk } from '@reduxjs/toolkit';
import { refresh, setform } from "./profileSlice";
import axios from 'axios';

export const createProfile = createAsyncThunk(
    'profile/createProfile',
    async (formData, { getState }) => {
        
        const { token } = getState().auth;
        const response = await axios.post(process.env.API_URL + "profile", formData, {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response)
        return response.data.data;
    }
);


export const updateProfile = (formData) => {
    return async (dispatch, getState) => {
        console.log(formData)
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "profile", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"

                },
                method: "PUT",
                body: JSON.stringify(formData)
            });
            const resposta = await data.json();
            console.log(resposta);
            if (resposta.success) {
                dispatch(refresh())
            }
        } catch (error) {
            // dispatch(setError("Error de conexión"));
            console.error(error)
        }
    };
};

export const delProfile = createAsyncThunk(
    'profile/deleteProfile',
    async (_, { getState }) => {
        const { token } = getState().auth;
        const response = await axios.delete(process.env.API_URL + "profile", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
);

export const fetchProfileForm = createAsyncThunk(
    'profile/fetchProfileForm',
    async (_, { getState }) => {
        const { token } = getState().auth;
        const response = await axios.get(process.env.API_URL + "profile-form", {
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data.data;
    }
);
