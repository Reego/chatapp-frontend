import {
    RECEIVE_MESSAGE,
    SEND_MESSAGE,
} from './actionTypes';

function receiveMessage(message, senderUsername) {
    return {
        type: RECEIVE_MESSAGE,
        message,
        messageIndex,
        senderUsername,
    }
}

function sendMessage(message) {
    type: SEND_MESSAGE,
    message
}

export {
    receiveMessage,
    sendMessage,
}
