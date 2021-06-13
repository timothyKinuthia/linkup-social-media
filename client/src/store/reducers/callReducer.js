import { actionTypes } from "../actions/actionTypes";

const initialState = null;


const callReducer = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.CALL:
            return action.payload;
        default:
            return state;
    }
};

export default callReducer;