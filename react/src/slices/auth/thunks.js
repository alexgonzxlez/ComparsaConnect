import { setToken, setError, setErrors } from "./authslice";
import { createSession, destroySession } from "../../services/Cookies/SessionService";

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
                    createSession(resposta.token, 14)
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

export const doRegister = (dades) => {
    return async (dispatch) => {
        const { name, email, username, password } = dades;
        try {
            const data = await fetch(process.env.API_URL + "register", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ name: name, email: email, username: username, password: password }),
            });
            const resposta = await data.json();
            if (resposta.errors) {
                dispatch(setErrors(resposta.errors));
            }
        } catch (error) {
            dispatch(setError("Error de conexión"));
        }
    };
};

export const verifyToken = (token) => {
    return async (dispatch) => {
        try {
            const data = await fetch(process.env.API_URL + "verifytoken", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            if (data.status === 401) {
                dispatch(setToken(null))
                destroySession();
            }
        } catch (error) {
            dispatch(setError("Error de conexión"));
        }
    }
}