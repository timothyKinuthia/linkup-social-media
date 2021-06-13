import { postTypes } from "../actions/postActions";

const initialState = [];

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.GET_POST:
      return [...state, action.payload];
    case postTypes.UPDATE_POST:
      const newPosts = [...state];
      const postIndex = newPosts.findIndex(
        (post) => post._id === action.payload._id
      );

      newPosts[postIndex] = action.payload;

      return newPosts;
    default:
      return state;
  }
};

export default detailReducer;
