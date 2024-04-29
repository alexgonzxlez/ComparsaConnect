import { createAsyncThunk } from "@reduxjs/toolkit";
import { refresh, setform } from "./profileSlice";
import axios from 'axios';

export const createProfile = (formData) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "profile", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: formData
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(refresh())
            }
            console.log(resposta)
        } catch (error) {
            // dispatch(setError("Error de conexión"));
            console.error(error)
        }
    };
};
// export const profileForm = () => {
//     return async (dispatch, getState) => {
//         const { token } = getState().auth;
//         try {
//             const data = await fetch(process.env.API_URL + "profile-form", {
//                 headers: {
//                     Accept: "application/json",
//                     Authorization: `Bearer ${token}`
//                 },
//                 method: "GET",
//             });
//             const resposta = await data.json();
//             if (resposta.success) {
//                 dispatch(setform(resposta.data))
//             }
//         } catch (error) {
//             // dispatch(setError("Error de conexión"));
//             console.error(error)
//         }
//     };
// };

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

export const delProfile = () => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "profile", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
            });
            const resposta = await data.json();
            console.log(resposta)
            if (resposta.success) {
                dispatch(refresh())
            }
        } catch (error) {
            // dispatch(setError("Error de conexión"));
            console.error(error)
        }
    };
};
export const fetchProfileForm = async () => {
        const response = await axios.get(process.env.API_URL + "profile-form", {
            headers: {
                Accept: "application/json",
            }
        });
        return response.data.data;
};
