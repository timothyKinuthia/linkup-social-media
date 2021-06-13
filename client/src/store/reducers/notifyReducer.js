import { actionTypes } from '../actions/actionTypes';

const initialState = {}

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.NOTIFY:
            return action.payload;
        default:
            return state;
    }
}

export default notifyReducer;