import { notificationTypes } from "../actions/notificationActions";

const initialState = {
  loading: false,
  data: [],
  sound: false,
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case notificationTypes.GET_NOTIFICATIONS:
      return {
        ...state,
        data: action.payload,
      };
    case notificationTypes.CREATE_NOTIFICATIONS:
      return {
        ...state,
        data: [action.pyload, ...state.data],
      };
    case notificationTypes.UPDATE_NOTIFICATIONS:
      const newData = [...state.data];

      const idx = newData.findIndex((val) => val._id === action.payload._id);

      newData[idx] = action.payload;

      return {
        ...state, data: newData
      };
    case notificationTypes.REMOVE_NOTIFICATIONS:
      return {
        ...state,
        data: state.data.filter(
          (item) =>
            item.id !== action.payload.id || item.url !== action.payload.url
        ),
      };
    case notificationTypes.NOTIFICATION_SOUND:
      return {
        ...state, sound: action.payload
      };
    case notificationTypes.DELETE_ALL:
      return {
        ...state, data: action.payload
      }
    default:
      return state;
  }
};

export default notificationReducer;
