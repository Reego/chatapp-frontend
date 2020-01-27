import {
    RECEIVE_USER_EVENT,
    RECEIVE_CHAT_EVENT,
} from './actionTypes';

function receiveUserEvent(payload) {
    return {
        type: RECEIVE_USER_EVENT,
        payload
    }
}

function receiveChatEvent(payload) {
    return {
        type: RECEIVE_CHAT_EVENT,
        payload
    }
}


export {
    receiveUserEvent,
    receiveChatEvent,
}
