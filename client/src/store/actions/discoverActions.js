import { getDataAPI } from "../../functions/fetcher";
import { actionTypes } from "./actionTypes";

export const discoverTypes = {
    LOADING_DICOVER: "LOADING_DISCOVER",
    GET_DISCOVER_POSTS: "GET_DISCOVER_POSTS",
    UPDATE_DISCOVER_POST: "UPDATE_DISCOVER_POST"
};

export const getDiscoverPosts = (token) => async (dispatch) => {
    
    try {
        dispatch({ type: discoverTypes.LOADING_DICOVER, payload: true });

        const res = await getDataAPI("posts_discover", token);
        
        dispatch({ type: discoverTypes.GET_DISCOVER_POSTS, payload: res.data });

        dispatch({ type: discoverTypes.LOADING_DICOVER, payload: false });

     } catch (err) {
        dispatch({
            type: actionTypes.NOTIFY,
            payload: { error: err.response.data.msg },
          });
    }
}