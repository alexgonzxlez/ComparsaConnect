import { setToken, setError } from "./authslice";
import { createSession } from "../../services/SessionStorage/SessionService";
import { createLocalStorageSession } from "../../services/LocalStorage/SessionService";

export const doLogin = (dades) => {
    return async (dispatch) => {
        const { username, password, rememberMe } = dades;
        try {
            const data = await fetch(process.env.API_URL + "login", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ username: username, password: password }),
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                if (rememberMe) {
                    createLocalStorageSession(resposta.token)
                } else {
                    createSession(resposta.token)
                }
                dispatch(setToken(resposta.token));
            } else {
                dispatch(setError(resposta.message));
            }
        } catch (error) {
            dispatch(setError("Error de conexión"));
        }
    };
};
