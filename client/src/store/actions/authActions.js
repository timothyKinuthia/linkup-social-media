import { actionTypes } from "./actionTypes";
import { postDataAPI } from '../../functions/fetcher';

export const login = (data) => async(dispatch) => {

    try {
        dispatch({ type: actionTypes.NOTIFY, payload: { loading: true } });

        const res = await postDataAPI('login', data);

        localStorage.setItem("firstLogin", true);

        dispatch({
            type: actionTypes.NOTIFY,
            payload: {
                success: res.data.msg,
                loading: false
            }
        })

        dispatch({
            type: actionTypes.AUTH,
            payload: {
                token: res.data.accessToken,
                user: res.data.user
            }
        })

     } catch (err) {
        dispatch({
            type: actionTypes.NOTIFY,
            payload: { loading: false, error: err.response.data.msg || "check your internet connection" }
        });
    }
}


export const refreshToken = () => async (dispatch) => {

    const firstLogin = localStorage.getItem("firstLogin");

    if (firstLogin) {
        dispatch({ type: "NOTIFY", payload: { loading: true } });

        try {

            const res = await postDataAPI('refresh_token')

            dispatch({
                type: actionTypes.AUTH,
                payload: {
                    token: res.data.accessToken,
                    user: res.data.user
                }
            })

            dispatch({ type: "NOTIFY", payload: { loading: false } });
            
        } catch (err) {
            dispatch({
                type: actionTypes.NOTIFY,
                payload: { loading: false, error: err.response.data.msg || "check your internet connection" }
            });
        }
    }
}

export const register = (data) => async(dispatch) => {


    try {
        const res = await postDataAPI('register', data);

        localStorage.setItem("firstLogin", true);

        dispatch({
            type: actionTypes.NOTIFY,
            payload: {
                success: res.data.msg,
                loading: false
            }
        });

        dispatch({
            type: actionTypes.AUTH,
            payload: {
                token: res.data.accessToken,
                user: res.data.user
            }
        });

     } catch (err) {
        dispatch({
            type: actionTypes.NOTIFY,
            payload: { loading: false, error: err.response.data.msg || "check your internet connection" }
        });
    }
}

export const logout = () => async(dispatch) => {

    try {

        localStorage.removeItem("firstLogin");

        await postDataAPI('logout')
        
        window.location.href = '/';

    } catch (err) {
        dispatch({
            type: actionTypes.NOTIFY,
            payload: { loading: false, error: err.response.data.msg || "check your internet connection" }
        });
    }
}