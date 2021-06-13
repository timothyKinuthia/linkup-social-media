const { postTypes } = require("../actions/postActions");

const initialState = {
  posts: [],
  result: 0,
  loading: false,
  page: 2,
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case postTypes.CREATE_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      };
    case postTypes.UPDATE_POST:
      const newPosts = [...state.posts];
      const postIndex = newPosts.findIndex(
        (post) => post._id === action.payload._id
      );

      newPosts[postIndex] = action.payload;

      return {
        ...state, posts: newPosts
      };
    case postTypes.LOADING_POST:
      return { ...state, loading: action.payload };
    case postTypes.GET_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: action.payload.page
      };
    case postTypes.DELETE_POST:

      const updatedPosts = [...state.posts];

      const idx = updatedPosts.findIndex((po) => po._id === action.payload._id);

      updatedPosts.splice(idx, 1);
      
      return {
        ...state, posts: updatedPosts
      }
    default:
      return state;
  }
};

export default postReducer;
