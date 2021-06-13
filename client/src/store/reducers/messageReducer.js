import { messageTypes } from "../actions/messageActions";
import { deleteHelper } from "./deleteHelper";

const initialState = {
  users: [],
  resultUsers: 0,
  data: [],
  resultData: 0,
  firstLoad: false,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case messageTypes.ADD_USER:
      return {
        ...state,
        users: [action.payload, ...state.users],
      };
    case messageTypes.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        users: state.users.map((user) =>
          user._id === action.payload.recipient ||
          user._id === action.payload.sender
            ? {
                ...user,
                text: action.payload.text,
                media: action.payload.media,
              }
            : user
        ),
      };
    case messageTypes.GET_CONVERSATIONS:
      return {
        ...state,
        users: action.payload.newArr,
        resultUsers: action.payload.result,
      };
    case messageTypes.GET_MESSAGES:
      return {
        ...state,
        data: action.payload.messages,
        resultData: action.payload.result,
      };
    case messageTypes.DELETE_MESSAGE:
      return {
        ...state,
        data: action.payload,
      };
    case messageTypes.DELETE_CONVERSATION:
      return {
        ...state,
        users: deleteHelper(state.users, action.payload),
        data: deleteHelper(state.data, action.payload),
      };
    default:
      return state;
  }
};

export default messageReducer;
