import { setUsers, setBannedUsers, startLoading, stopLoading } from "./adminSlice";
import { NotificationActions } from "../../components/Notifications/notificationSlice";

export const getUsers = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;

        try {
            const data = await fetch(process.env.API_URL + "moderate-users", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(setUsers(resposta.data))
            }
        } catch (error) {
            // dispatch(setError(error));
            console.error(error)
            dispatch(stopLoading())
        }
    };
};

export const banUser = (id, reason) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;

        try {

            const data = await fetch(process.env.API_URL + "ban-user/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({ reason })
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(NotificationActions.addNotification({
                    message: resposta.message,
                    type: "success"
                }));
            }
        } catch (error) {
            // dispatch(setError(error));
            dispatch(NotificationActions.addNotification({
                message: resposta.message,
                type: "error"
            }));
            dispatch(stopLoading())
        }
    };
}

export const getBannedUsers = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;

        try {
            const data = await fetch(process.env.API_URL + "moderate-banned-users", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(setBannedUsers(resposta.data))
            }
        } catch (error) {
            // dispatch(setError(error));
            console.error(error)
            dispatch(stopLoading())
        }
    };
};

export const unbanUser = (id) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;

        try {

            const data = await fetch(process.env.API_URL + "unban-user/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(NotificationActions.addNotification({
                    message: resposta.message,
                    type: "success"
                }));
            }
        } catch (error) {
            // dispatch(setError(error));
            dispatch(NotificationActions.addNotification({
                message: resposta.message,
                type: "error"
            }));
            dispatch(stopLoading())
        }
    };
}