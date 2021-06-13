import { suggestionTypes } from "../actions/suggestionsAction"

const initialState = {
    loading: false,
    users: []
}

const suggestionsReducer = (state = initialState, action) => {
    switch (action.type) {
        case suggestionTypes.LOADING_SUGGESTIONS:
            return { ...state, loading: action.payload };
        case suggestionTypes.GET_SUGGESTION_USERS:
            return {
                ...state, users: action.payload.users
            }
        default:
            return state;
    }
};

export default suggestionsReducer;