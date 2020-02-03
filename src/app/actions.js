import {
    DISCONNECT_WEB_SOCKET,
    // RECEIVE_USER_EVENT,
    // RECEIVE_CHAT_EVENT,
    RECEIVE_WEB_SOCKET_EVENT,
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
};
