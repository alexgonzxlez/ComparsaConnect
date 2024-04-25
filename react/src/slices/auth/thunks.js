import { setToken, setUserData, setError, setErrors, removeAuthToken, setSuccess } from "./authslice";
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
            if (resposta.success) {
                console.log("success")
                dispatch(setSuccess())
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
                method: "GET",
            });
            const resposta = await data.json();
            if (data.status === 401) {
                dispatch(setToken(null))
                destroySession();
            } else if (data.status === 200) {
                dispatch(setUserData(resposta.data))
            }
        } catch (error) {
            dispatch(setError("Error de conexión"));
        }
    }
}
export const doLogout = () => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "logout", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            const resposta = await data.json();
            if (resposta.success === true) {
                dispatch(removeAuthToken())
                destroySession();
            } else {
                console.log(resposta.message);
            }

        } catch (error) {
            console.error(error)
        }
    }
}

export const updateProfile = (dades) => {
    return async (dispatch, getState) => {
        const { name, email, username } = dades;
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "account", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({ name: name, email: email, username: username }),
            });
            const resposta = await data.json();
            if (resposta.errors) {
                dispatch(setErrors(resposta.errors));
            }
            if (resposta.success) {
                console.log("success")
                dispatch(setSuccess())
            }
        } catch (error) {
            dispatch(setError("Error de conexión"));
        }
    };
};

export const doProfileForm = (dades) => {
    return async (dispatch) => {
        const { gender, description, birthdate, gender_preference } = dades;
        try {
            const data = await fetch(process.env.API_URL + "/profile", {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
                body: JSON.stringify({ gender: gender, description: description, birthdate: birthdate, gender_preference: gender_preference }),
            });
            const resposta = await data.json();
            if (resposta.errors) {
                dispatch(setErrors(resposta.errors));
            }
            if (resposta.success) {
                console.log("success")
                dispatch(setSuccess())
            }
        } catch (error) {
            dispatch(setError("Error de conexión"));
        }
    };
};