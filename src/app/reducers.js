import {
    DISCONNECT_WEB_SOCKET,
    RECEIVE_WEB_SOCKET_EVENT,
    RECEIVE_CHANGE_CURRENT_GROUP,
    RECEIVE_READ_MESSAGE,
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
    switch(payload['command_type']) {
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

    let groups = {
        ...chat['groups']
    };
    const groupId = payload['group_id'];
    const arg = payload['message'];

    switch(payload['command_type']) {
        case CREATE_GROUP_COMMAND: // the logged-in user has made a group
            if (!(groupId in groups)) {
                groups[groupId] = {
                    groupId,
                    'groupName': payload['message'],
                    'messages': [],
                };
                return {
                    ...chat,
                    'currentGroupId': groupId,
                    'groups': groups
                };
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
                const newState = {
                    ...chat,
                    'groups':groups,
                };
                if(firstKey) {
                    newState['currentGroupId'] = firstKey;
                }
                return newState
            }
            break;
        case CHANGE_NAME_GROUP_COMMAND:
            if(groupId in groups) {
                groups[groupId]['groupName'] = arg;
                return {
                    ...chat,
                    'groups':groups
                };
            }
            break;
        case INIT_GROUPS_COMMAND:
            groups = {};
            const tempGroups = payload['groups'];
            const newState = {
                ...chat
            };
            if(tempGroups !== {}) {
                let first = true;
                for(let groupId in tempGroups) {
                    const group = tempGroups[groupId];
                    if (first) {
                        newState['currentGroupId'] = group['group_id'];
                        first = false;
                    }
                    groups[group['group_id']] = {
                        'groupId': group['group_id'],
                        'groupName': group['group_name'],
                        'messages': group['messages'],
                        'read': group['read'],
                    };
                }
                newState['groups'] = groups
            }
            else {
                if('currentGroupId' in newState) {
                    delete newState['currentGroupId'];
                }
            }
            return newState;
            break;
    }
    return chat;
}

// processes events that occur within a conversation - messages

function chatEvent(chat, payload) {

    const groups = {
        ...chat['groups']
    };

    const groupId = payload['group_id'];
    const message = payload['message'];
    const username = payload['username'];

    console.log(payload);

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

    return {
        ...chat,
        'groups': groups,
    };

    // else don't do anything
}

function reducer(state={}, action) {

    switch(action.type) {
        case DISCONNECT_WEB_SOCKET:
            return {}
            break;
        case RECEIVE_WEB_SOCKET_EVENT:
            if(!action['payload']) break;
            return receiveWebSocketEvent(state, action);
            break;
        case RECEIVE_CHANGE_CURRENT_GROUP:
            return {
                ...state,
                'currentGroupId': action.groupId
            };
            break;
        case RECEIVE_READ_MESSAGE:
            const newState = {...state};
            if(action.groupId in state['groups']) {
                const groups = {...state['groups']};
                groups[action.groupId].read = false;
                return {
                    ...state,
                    groups,
                };
            }
            return newState;
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
