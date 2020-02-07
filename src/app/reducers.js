import {
    DISCONNECT_WEB_SOCKET,
    RECEIVE_WEB_SOCKET_EVENT,
    RECEIVE_CHANGE_CURRENT_GROUP,
} from './actionTypes';

// before any of this, Websocket received JSON object with structure:
// check .json

const MESSAGE_COMMAND = 'MESSAGE';
const CREATE_GROUP_COMMAND = 'GROUP_CREATE';
const DELETE_GROUP_COMMAND = 'GROUP_DELETE';
const CHANGE_NAME_GROUP_COMMAND = 'GROUP_NAME_CHANGE';
const INIT_GROUPS_COMMAND = 'INIT';

// processes WebSocket Event and sends it to appropriate sub event type

function receiveWebSocketEvent(chat={}, action) {

    if(!chat['groups']) {
        chat['groups'] = {};
    }

    const payload = action.payload;
    switch(payload['command']) {
        case MESSAGE_COMMAND:
            chat = chatEvent(chat, payload);
            break;
        default:
            chat = userEvent(chat, payload);
    }
    return chat;
}

// processes events that alter groups in broader scope - deletion, creation, name-change

function userEvent(chat, payload) {

    let groups = chat['groups'];
    const groupId = payload['group_id'];
    const arg = payload['message'];

    switch(payload['command']) {
        case CREATE_GROUP_COMMAND: // the logged-in user has made a group
            if (!(groupId in groups)) {
                groups[groupId] = {
                    groupId,
                    'groupName': payload['message'],
                    'messages': [],
                };
                chat['currentGroupId'] = groupId;
            }
            break;
        case DELETE_GROUP_COMMAND: // the logged-in user has left the group
            if(groupId in groups) {
                delete groups[groupId];
            }
            if(chat['currentGroupId'] === groupId) {
                for(var firstKey in chat['groups']) {
                    break;
                }
                if(firstKey) {
                    chat['currentGroupId'] = firstKey;
                }
                else {
                    delete chat['currentGroupId'];
                }
            }
            break;
        case CHANGE_NAME_GROUP_COMMAND:
            if(groupId in groups) {
                groups[groupId]['groupName'] = arg;
            }
            break;
        case INIT_GROUPS_COMMAND:
            chat['groups'] = {};
            groups = chat['groups'];
            const tempGroups = payload['groups'];
            if(tempGroups !== {}) {
                let first = true;
                for(let groupId in tempGroups) {
                    const group = tempGroups[groupId];
                    if (first) {
                        chat['currentGroupId'] = group['group_id'];
                        first = false;
                    }
                    groups[group['group_id']] = {
                        'groupId': group['group_id'],
                        'groupName': group['group_name'],
                        'messages': group['messages'],
                        'read': group['read'],
                    };
                }
            }
            else {
                delete chat['currentGroupId'];
            }
            break;
        default: // unrecognized command, no change to state
            return null;
    }

    return chat;

}

// processes events that occur within a conversation - messages

function chatEvent(chat, payload) {

    const groups = chat['groups'];

    const groupId = payload['group_id'];
    const message = payload['message'];
    const username = payload['username'];

    if(groupId in groups) {
        const group = groups[groupId];
        group['messages'].push(
            {
                message,
                username,
            }
        );
        if(groupId !== chat['currentGroupId']) {
            group['read'] = false;
        }
    }

    return chat;

    // else don't do anything
}

function reducer(state={}, action) {

    switch(action.type) {
        case DISCONNECT_WEB_SOCKET:
            state = {}
            break;
        case RECEIVE_WEB_SOCKET_EVENT:
            if(!action['payload']) break;
            state = receiveWebSocketEvent(state, action);
            break;
        case RECEIVE_CHANGE_CURRENT_GROUP:
            state['currentGroupId'] = action.groupId;
            break;
    }
    return state;
}

export {
    MESSAGE_COMMAND,
    CREATE_GROUP_COMMAND,
    DELETE_GROUP_COMMAND,
    CHANGE_NAME_GROUP_COMMAND,
    INIT_GROUPS_COMMAND,
};

export default reducer;
