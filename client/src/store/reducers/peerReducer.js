
import { actionTypes } from "../actions/actionTypes";

const initialState = null;


const peerReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.PEER:
            return action.payload;
        default:
            return state;
    }
};

export default peerReducer;