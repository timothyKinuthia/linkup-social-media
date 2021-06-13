import { discoverTypes } from "../actions/discoverActions";

const initialState = {
  loading: false,
  posts: [],
  result: 9,
  page: 2,
  firstLoad: false,
};

const discoverReducer = (state = initialState, action) => {
  switch (action.type) {
    case discoverTypes.LOADING_DICOVER:
      return { ...state, loading: action.payload };
    case discoverTypes.GET_DISCOVER_POSTS:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        firstLoad: true,
      };
    case discoverTypes.UPDATE_DISCOVER_POST:
      return {
        ...state,
        posts: action.payload.posts,
        result: action.payload.result,
        page: state.page + 1
      };
    default:
      return state;
  }
};

export default discoverReducer;
