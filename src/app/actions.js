import {
    DISCONNECT_WEB_SOCKET,
    // RECEIVE_USER_EVENT,
    // RECEIVE_CHAT_EVENT,
    RECEIVE_READ_MESSAGE,
    RECEIVE_WEB_SOCKET_EVENT,
    RECEIVE_CHANGE_CURRENT_GROUP,
} from './actionTypes';

function disconnectWebSocket() {
    return {
        type: DISCONNECT_WEB_SOCKET,
    };
}

function receiveWebSocketEvent(payload) {
    return {
        type: RECEIVE_WEB_SOCKET_EVENT,
        payload
    };
}

function receiveChangeCurrentGroup(groupId) {
    return {
        type: RECEIVE_CHANGE_CURRENT_GROUP,
        groupId
    };
}

function receiveReadMessage(groupId) {
    return {
        type: RECEIVE_READ_MESSAGE,
        groupId
    };
}

// function receiveUserEvent(payload) {
//     return {
//         type: RECEIVE_USER_EVENT,
//         payload
//     }
// }

// function receiveChatEvent(payload) {
//     return {
//         type: RECEIVE_CHAT_EVENT,
//         payload
//     }
// }

export {
    // receiveUserEvent,
    // receiveChatEvent,
    disconnectWebSocket,
    receiveWebSocketEvent,
    receiveChangeCurrentGroup,
    receiveReadMessage,
};
