import { getDataAPI } from "../../functions/fetcher";
import { actionTypes } from "./actionTypes";

export const suggestionTypes = {
    LOADING_SUGGESTIONS: "LOADING_SUGGESTIONS",
    GET_SUGGESTION_USERS: "GET_SUGGESTION_USERS"
}

export const getSuggestions = (token) => async(dispatch) => {

    try {
        dispatch({ type: suggestionTypes.LOADING_SUGGESTIONS, payload: true });

        const res = await getDataAPI('suggestions', token);


        dispatch({type: suggestionTypes.GET_SUGGESTION_USERS, payload: res.data})

        dispatch({ type: suggestionTypes.LOADING_SUGGESTIONS, payload: false });

    } catch (err) {

        dispatch({ type: actionTypes.NOTIFY, error: err.response.data.msg });
    }
}