import { setMessages, startLoading, stopLoading } from "./chatSlice";

export const getMessages = () => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "messages", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            if (resposta.success) {
                console.log(resposta.data)
                dispatch(setMessages(resposta.data))
            }
        } catch (error) {
            console.log(error);
            dispatch(stopLoading())
        }
    }
};

export const sendMessage = (text) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const { token } = getState().auth;

        try {

            const data = await fetch(process.env.API_URL + "message", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({ text })
            });
            const resposta = await data.json();
            if (resposta.success) {
                console.log(resposta.message)
            }
        } catch (error) {
            console.log(error);
        }
    };
}