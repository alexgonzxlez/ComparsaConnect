import { setSearchdata, startLoading, updateSearchData } from "./friendshipSlice";

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

export const sendFriendRequest = (id) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "send-friend/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            const resposta = await data.json();
            if (resposta.success) {
                const searchdata = getState().friendship.searchdata;
                const updatedSearchData = searchdata.map(user => {
                    if (user.id === id) {
                        return { ...user, friend_status: 'sended' };
                    }
                    return user;
                });
                dispatch(setSearchdata(updatedSearchData));
            }
        } catch (error) {
            console.error(error);
            // Maneja el error aquí
        }
    };
};

export const cancelFriendRequest = (id) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "cancel-friend/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "DELETE",
            });
            const resposta = await data.json();
            if (resposta.success) {
                const searchdata = getState().friendship.searchdata;
                const updatedSearchData = searchdata.map(user => {
                    if (user.id === id) {
                        return { ...user, friend_status: null };
                    }
                    return user;
                });
                dispatch(setSearchdata(updatedSearchData));
            }
        } catch (error) {
            console.error(error);
            // Maneja el error aquí
        }
    };
};

export const acceptFriendRequest = (id) => {
    return async (dispatch, getState) => {
        const { token } = getState().auth;
        try {
            const data = await fetch(process.env.API_URL + "accept-friend/" + id, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                method: "POST",
            });
            const resposta = await data.json();
            if (resposta.success) {
                const searchdata = getState().friendship.searchdata;
                const updatedSearchData = searchdata.map(user => {
                    if (user.id === id) {
                        return { ...user, friend_status: 'accepted' };
                    }
                    return user;
                });
                dispatch(setSearchdata(updatedSearchData));
            }
        } catch (error) {
            console.error(error);
            // Maneja el error aquí
        }
    };
}