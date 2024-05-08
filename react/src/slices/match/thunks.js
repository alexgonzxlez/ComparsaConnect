import { setSuitors, startLoading, stopLoading } from "./matchSlice";

export const getSuitors = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;

        try {
            const data = await fetch(process.env.API_URL + "find-match", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success) {
                dispatch(setSuitors(resposta.data))
            }
        } catch (error) {
            // dispatch(setError(error));
            console.error(error)
            dispatch(stopLoading())
        }
    };
};

export const like = (id) => {
    return async (getState) => {
        const { token } = getState().auth;

        try {
            const data = await fetch(process.env.API_URL + "send-like" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            const resposta = await data.json();
            if (resposta.success) {
                console.log("Like aceptado")
            }
        } catch (error) {
            // dispatch(setError(error));
            console.error(error)
        }
    };
};