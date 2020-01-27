import {
    RECEIVE_USER_EVENT,
    RECEIVE_CHAT_EVENT,
} from './actionTypes';

// before any of this, Websocket received JSON object with structure:
// check .json

function receiveWebsocketEvent(state={}, action) {

    let groups = {};
    switch(action.type) {
        case RECEIVE_USER_EVENT:
            groups = userEvent(state.groups, action.payload);
            break;
        case RECEIVE_CHAT_EVENT:
            groups = chatEvent(state.groups, action.payload);
            break;
    }
    return {
        ...state,
        groups,
    }
}

const CREATE_GROUP_COMMAND = 'CREATE_GROUP_COMMAND';
const DELETE_GROUP_COMMAND = 'DELETE_GROUP_COMMAND';

function userEvent(groups = {}, payload) {

    let updated_groups = {};

    const groupId = payload['group_id'];

    switch(payload['type']) {
        case CREATE_GROUP_COMMAND:
            groups[groupId] = {
                groupId,
                groupName: payload['group_name'],
                messages: []
            };
        case DELETE_GROUP_COMMAND:
            if(groups.contains(groupId)) {
                delete groups[groupId];
            }
    }

    return groups;

}

// only message events can be received here
function chatEvent(groups = {}, payload) {

    const groupId = payload['group_id'];

    if(groups.contains(groupId)) {
        group = groups[groupId];
        group.messages.append(
            Object.assign({}, payload['message']);
        );
    }
    else {
        return null;
    }

    return groups;

    // else don't do anything
}

export {
    receiveWebsocketEvent as chat
}
