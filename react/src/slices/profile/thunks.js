import { refresh, setProfile, setform, startLoading } from "./profileSlice";

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
export const getProfile = () => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        dispatch(startLoading())
        try {
            const data = await fetch(process.env.API_URL + "profile", {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(setform(resposta.data))
                dispatch(setProfile(resposta.profile))
            }
        } catch (error) {
            // dispatch(setError("Error de conexión"));
            console.error(error)
        }
    };
};

export const updateProfile = (formData, id) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "profile/" + id, {
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${token}`,
                },
                method: "POST",
                body: formData
            });
            const resposta = await data.json();
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