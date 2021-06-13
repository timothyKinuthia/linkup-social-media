import { actionTypes } from '../actions/actionTypes';

const initialState = false;


const themeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.THEME:
            return action.payload;
        default:
            return state;
    }
}

export default themeReducer;