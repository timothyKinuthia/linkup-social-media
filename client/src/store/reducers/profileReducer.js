import { profileTypes } from "../actions/profileActions";

const initialState = {
  loading: false,
  ids: [],
  users: [],
  userPosts: [],
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case profileTypes.LOADING:
      return { ...state, loading: action.payload };
    case profileTypes.GET_USER:
      return { ...state, users: [...state.users, action.payload.user] };
    case profileTypes.FOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case profileTypes.UNFOLLOW:
      return {
        ...state,
        users: state.users.map((user) =>
          user._id === action.payload._id ? action.payload : user
        ),
      };
    case profileTypes.GET_PROFILE_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    case profileTypes.GET_PROFILE_POSTS:
      return {
        ...state,
        userPosts: [...state.userPosts, action.payload],
      };
    case profileTypes.UPDATE_PROFILE_POSTS:
      const newUserPosts = [...state.userPosts];

      const idx = newUserPosts.findIndex((p) => p._id === action.payload._id);

      newUserPosts[idx] = action.payload;

      return {
        ...state,
        userPosts: newUserPosts,
      };
    default:
      return state;
  }
};

export default profileReducer;
