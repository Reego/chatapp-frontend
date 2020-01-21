import {
    RECEIVE_MESSAGE,
}

function receivedMessages(state, action) {

}

function messages(state = {}, action) {

    switch(action.type) {
        case RECEIVE_MESSAGE:
            return receivedMessages(state, action);
        break;
        default:
            return [];
    }
}

export {
    messages
}
