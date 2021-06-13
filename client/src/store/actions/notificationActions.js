import { deleteDataAPI, postDataAPI, getDataAPI, patchDataAPI } from "../../functions/fetcher";
import { actionTypes } from "./actionTypes"


export const notificationTypes = {
    GET_NOTIFICATIONS: 'GET_NOTIFICATIONS',
    CREATE_NOTIFICATIONS: 'CREATE_NOTIFICATIONS',
    UPDATE_NOTIFICATIONS: 'UPDATE_NOTIFICATIONS',
    REMOVE_NOTIFICATIONS: 'REMOVE_NOTIFICATIONS',
    NOTIFICATION_SOUND: 'NOTIFICATION_SOUND',
    DELETE_ALL: 'DELETE_ALL'
}


export const createNotify = ({ msg, auth }) => async (dispatch) => {
    
    try {
        const res = await postDataAPI('notify', msg, auth.token);

        
        dispatch({ type: notificationTypes.CREATE_NOTIFICATIONS, payload: res.data.notify });

        dispatch(getNotifications(auth.token));

    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
}

export const removeNotify = ({ msg, auth }) => async (dispatch) => {
    try {
        await deleteDataAPI(`notify/${msg.id}?url=${msg.url}`, auth.token);


        dispatch({ type: notificationTypes.REMOVE_NOTIFICATIONS, payload: msg });

    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
};

export const getNotifications = (token) => async (dispatch) => {
    
    try {
        
        const res = await getDataAPI('notifications', token);

        dispatch({ type: notificationTypes.GET_NOTIFICATIONS, payload: res.data.notifications });

    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
};

export const notificationIsRead = ({ item, auth }) => async (dispatch) => {
    
    dispatch({ type: notificationTypes.UPDATE_NOTIFICATIONS, payload: { ...item, isRead: true } });

    try {
        await patchDataAPI(`/notificationsRead/${item._id}`, null, auth.token);
    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
};


export const deleteNotifications = (token) => async (dispatch) => {
    
    dispatch({ type: notificationTypes.DELETE_ALL, payload: [] });

    try {
        await deleteDataAPI('deleteAll', token);
    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
}