import { actionTypes } from '../actions/actionTypes';

const initialState = {}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH:
            return action.payload;
        default:
            return state;
    }
}

export default authReducer;