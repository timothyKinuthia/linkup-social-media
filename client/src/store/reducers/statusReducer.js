import { actionTypes } from "../actions/actionTypes";


const initialState = false;


const statusReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STATUS:
            return action.payload;
        default:
            return state;
    }
}

export default statusReducer;