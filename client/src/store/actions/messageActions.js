import { actionTypes } from "./actionTypes";
import { deleteDataAPI, getDataAPI, postDataAPI } from "../../functions/fetcher";

export const messageTypes = {
    ADD_USER: 'ADD_USER',
    ADD_MESSAGE: 'ADD_MESSAGE',
    GET_CONVERSATIONS: 'GET_CONVERSATIONS',
    GET_MESSAGES: 'GET_MESSAGES',
    DELETE_MESSAGE: 'DELETE_MESSAGE',
    DELETE_CONVERSATION: 'DELETE_CONVERSATION',
}

export const addUser = ({ user, message }) => async (dispatch) => {
    if (message.users.every((item) => item._id !== user._id)) {
        dispatch({ type: messageTypes.ADD_USER, payload: { ...user, text: '', media: [] } })
    }
};

export const addMessage = ({ msg, auth, socket }) => async (dispatch) => {

    try {
        await postDataAPI('message', msg, auth.token);
        dispatch({ type: messageTypes.ADD_MESSAGE, payload: msg });

    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
};

export const getConversations = ({ auth }) => async (dispatch) => {
    
    try {
        const res = await getDataAPI('conversation', auth.token);
        
        let newArr = [];

        res.data.conversations.forEach((item) => {
            item.recipients.forEach((rec) => {
                if (rec._id !== auth.user._id) {
                    newArr.push({ ...rec, text: item.text, media: item.media });
                }
            })
        });

        dispatch({ type: messageTypes.GET_CONVERSATIONS, payload: { newArr, result: res.data.result } });

    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
};

export const getMessages = ({ auth, id }) => async (dispatch) => {
    
    try {
        const res = await getDataAPI(`message/${id}`, auth.token);

        dispatch({ type: messageTypes.GET_MESSAGES, payload: res.data });

    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
};

export const deleteMessage = ({ msg, data, auth }) => async (dispatch) => {
    
    const newData = [...data];

    const idx = newData.findIndex((item) => item._id === msg._id);

    newData.splice(idx, 1);

    try {
        
        await deleteDataAPI(`deleteMessage/${msg._id}`, auth.token);

        dispatch({ type: messageTypes.DELETE_MESSAGE, payload: newData });

     } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }

    dispatch({ type: messageTypes.DELETE_MESSAGE, payload: newData })
}

export const deleteConversation = ({ id, auth }) => async (dispatch) => {
    
    try {
        await deleteDataAPI(`conversation/${id}`, auth.token);

        dispatch({ type: messageTypes.DELETE_CONVERSATION, payload: id });

    } catch (err) {
        dispatch({ type: actionTypes.NOTIFY, payload: { error: err.response.data.msg } });
    }
}