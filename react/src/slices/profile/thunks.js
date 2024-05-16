import { NotificationActions } from "../../components/Notifications/notificationSlice";
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
                dispatch(NotificationActions.addNotification({
                    message: "Se ha creado tu perfil correctamente",
                    type: "success"
                }));

            } else {
                dispatch(NotificationActions.addNotification({
                    timeout: null,
                    message: resposta.message,
                    type: "error"
                }));

            }
        } catch (error) {
            dispatch(NotificationActions.addNotification({
                timeout: null,
                message: "Error de conexión",
                type: "error"
            }));
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
            dispatch(NotificationActions.addNotification({
                timeout: null,
                message: "Error de conexión",
                type: "error"
            }));
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
                dispatch(NotificationActions.addNotification({
                    message: "Se ha actualizado el perfil correctamente",
                    type: "success"
                }));
                dispatch(setProfile(resposta.data))
            } else {
                dispatch(NotificationActions.addNotification({
                    message: resposta.message,
                    type: "error"
                }));

            }
        } catch (error) {
            dispatch(NotificationActions.addNotification({
                timeout: null,
                message: "Error de conexión",
                type: "error"
            }));
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
                dispatch(NotificationActions.addNotification({
                    message: "Se ha eliminado el perfil correctamente",
                    type: "success"
                }));

            }
        } catch (error) {
            console.error(error)
            dispatch(NotificationActions.addNotification({
                timeout: null,
                message: "Error de conexión",
                type: "error"
            }));

        }
    };
};