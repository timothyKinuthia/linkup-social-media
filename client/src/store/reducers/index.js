import { combineReducers } from 'redux';
import authReducer from './authReducer';
import notifyReducer from './notifyReducer';
import themeReducer from './themeReducer';
import profileReducer from './profileReducer';
import statusReducer from './statusReducer';
import postReducer from './postReducer';
import detailReducer from './detailReducer'
import discoverReducer from './discoverReducer';
import suggestionsReducer from './suggestionsReducer';
import socketReducer from './socketReducer';
import notificationReducer from './notificationsReducer';
import messageReducer from './messageReducer'
import callReducer from './callReducer';
import peerReducer from './peerReducer';


export default combineReducers({
    auth: authReducer,
    notify: notifyReducer,
    theme: themeReducer,
    profile: profileReducer,
    status: statusReducer,
    homeposts: postReducer,
    detailPost: detailReducer,
    discover: discoverReducer,
    suggestions: suggestionsReducer,
    socket: socketReducer,
    notifications: notificationReducer,
    message: messageReducer,
    call: callReducer,
    peer: peerReducer
});