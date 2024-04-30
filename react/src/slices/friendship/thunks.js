import { setSearchdata, startLoading } from "./friendshipSlice";

export const searchUsers = (filter) => {
    return async (dispatch, getState) => {
        dispatch(startLoading())
        const searchParams = new URLSearchParams();
        searchParams.append("query", filter); 
        const { token } = getState().auth;
        
        try {
            const data = await fetch(process.env.API_URL + "users/search?" + searchParams.toString(), {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "GET",
            });
            const resposta = await data.json();
            console.log(resposta);
            if (resposta.success) {
                dispatch(setSearchdata(resposta.data))
            }
        } catch (error) {
            // dispatch(setError(error));
            console.error(error)
        }
    };
};
