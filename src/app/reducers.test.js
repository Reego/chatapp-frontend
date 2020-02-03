import {
    DISCONNECT_WEB_SOCKET,
    RECEIVE_WEB_SOCKET_EVENT,
} from './actionTypes';

import {
    MESSAGE_COMMAND,
    CREATE_GROUP_COMMAND,
    DELETE_GROUP_COMMAND,
    CHANGE_NAME_GROUP_COMMAND,
    INIT_GROUPS_COMMAND,
} from './reducers';

import chat from './reducers';

// const userCreateGroupAction = {
//     type: RECEIVE_WEB_SOCKET_EVENT,
//     payload: {
//         'group_id': 1,
//         'group_name': 'sample_name',
//     }
// }

// const userDeleteGroupAction = {
//     type: RECEIVE_WEB_SOCKET_EVENT,
//     payload: {
//         'group_id': 1,
//         'group_name': 'sample_name',
//     }
// }

// const chatAction = {
//     type: RECEIVE_CHAT_EVENT,
//     payload: {
//         'group_id': 1,
//         'message': {
//             username: ''
//         }
//     }
// }

function getInitialState() {
    return {
        'groups': {
            '0': {
                'groupId': '0',
                'groupName': 'group0',
                'messages': [],
            },
            '1': {
                'groupId': '1',
                'groupName': 'group1',
                'messages': [
                    {
                        'username': 'sampleUsername',
                        'message': 'Wow!',
                    }
                ],
            },
            '2': {
                'groupId': '2',
                'groupName': 'group2',
                'messages': [],
            }
        }
    };
}

describe('test with undefined initial state', () => {

    it('test non complementary action with undefined initial', () => {
        const action = {'type':''};
        expect(chat(undefined, action)).toBeDefined();
    });

    it('test DISCONNECT_WEB_SOCKET with undefined initial', () => {
        const action = { type: DISCONNECT_WEB_SOCKET };
        expect(chat(undefined, action)).toBeDefined();
    });

    it('test RECEIVE_WEB_SOCKET_EVENT with undefined initial', () => {
        const action = { type: RECEIVE_WEB_SOCKET_EVENT };
        expect(chat(undefined, action)).toBeDefined();
    });
});

describe('test chat reducer with DISCONNECT_WEB_SOCKET action', () => {

    let initialState = {'chat': {}};

    const action = { type: DISCONNECT_WEB_SOCKET };

    it('test DISCONNECT_WEB_SOCKET removes \'chat\' from state', () => {
        expect(chat(initialState, action)).toEqual({});
    });
});

describe('test chat reducer with RECEIVE_WEB_SOCKET_EVENT action', () => {

    let USERNAME, GROUP_ONE, GROUP_TWO;
    let initialState = {};

    const makeAction = (command, body) => {
        return {
            'type': RECEIVE_WEB_SOCKET_EVENT,
            'payload': {
                'command': command,
                ...body,
            },
        };
    };

    beforeEach(() => {
        USERNAME = 'USERNAME';
        GROUP_ONE = {
            'groupId': '1',
            'groupName': 'GROUP_ONE',
            'messages': [],
            'read': false,
        };
        GROUP_TWO = {
            'groupId': '2',
            'groupName': 'GROUP_TWO',
            'messages': [],
            'read': false,
        };
        initialState = {
            'groups': {
                '1': GROUP_ONE,
                '2': GROUP_TWO,
            },
            'currentGroupId': '2',
        }
    });

    it('test CREATE_GROUP_COMMAND with same user ID', () => {
        const action = makeAction(CREATE_GROUP_COMMAND, {
            'group_id': GROUP_ONE['groupId'],
            'message': 'WOW'
        });
        expect(chat(initialState, action)['groups']['1']).toEqual(GROUP_ONE);
    });

    it('test CREATE_GROUP_COMMAND with new group', () => {
        const groupName = 'WOW';
        const action = makeAction(CREATE_GROUP_COMMAND, {
            'group_id': '3',
            'message': groupName,
        });
        const finalState = chat(initialState, action);
        expect(finalState['groups']['3']['groupName']).toEqual(groupName);
    });

    it('test DELETE_GROUP_COMMAND with invalid groupId', () => {
        const groupId = '3';
        const action = makeAction(DELETE_GROUP_COMMAND, {
            'group_id': groupId,
        });
        const finalState = chat(initialState, action);
        expect(Object.keys(finalState['groups']).length).toBe(2);
    });

    it('test DELETE_GROUP_COMMAND with valid groupId and change in currentGroupId', () => {
        const groupId = '2';
        const action = makeAction(DELETE_GROUP_COMMAND, {
            'group_id': groupId,
        });
        const finalState = chat(initialState, action);
        expect(finalState['groups'][groupId]).toBeUndefined() && expect(finalState['currentGroupId'].toEqual('1'));
    });

    it('test CHANGE_NAME_GROUP_COMMAND with valid groupId', () => {
        const groupId = '1';
        const newGroupName = 'NEW_GROUP_NAME';
        const action = makeAction(CHANGE_NAME_GROUP_COMMAND, {
            'group_id': groupId,
            'message': newGroupName,
        });
        const finalState = chat(initialState, action);
        expect(finalState['groups'][groupId]['groupName']).toEqual(newGroupName);
    });

    it('test INIT_GROUPS_COMMAND', () => {
        const NEW_GROUP_ONE = {
            'group_id': '1',
            'group_name': 'NEW_GROUP_ONE',
            'read': true,
            'messages': [],
        };
        const NEW_GROUP_TWO = {
            'group_id': '3',
            'group_name': 'NEW_GROUP_TWO',
            'read': false,
            'messages': [],
        };
        const PROC_GROUP_ONE = {
            'groupId': NEW_GROUP_ONE['group_id'],
            'groupName': NEW_GROUP_ONE['group_name'],
            'read': NEW_GROUP_ONE['read'],
            'messages': NEW_GROUP_ONE['messages'],
        };
        const PROC_GROUP_TWO = {
            'groupId': NEW_GROUP_TWO['group_id'],
            'groupName': NEW_GROUP_TWO['group_name'],
            'read': NEW_GROUP_TWO['read'],
            'messages': NEW_GROUP_TWO['messages'],
        };
        const action = makeAction(INIT_GROUPS_COMMAND, {
            'groups': {
                '1': NEW_GROUP_ONE,
                '3': NEW_GROUP_TWO,
            }
        });
        const finalState = chat(initialState, action);
        expect(finalState['groups']['1']).toEqual(PROC_GROUP_ONE) &&
        expect(Object.keys(finalState['groups']).length).toBe(2);
    });

    it('test MESSAGE_COMMAND', () => {
        const message = 'MESSAGE';
        const username = 'USERNAME';
        const NEW_MESSAGE = {
            'message': message,
            'username': username,
        }
        const action = makeAction(MESSAGE_COMMAND, {
            ...NEW_MESSAGE,
            'group_id': '1',
        });
        const finalState = chat(initialState, action);
        expect(finalState['groups']['1']['messages'][0]['message']).toEqual(message) &&
        expect(finalState['groups']['1']['messages'][0]['username']).toEqual(username);
    });
});




// describe('test user action reducer', () => {

//     let initialState = {};

//     beforeEach(() => {
//         initialState = getInitialState();
//     });

//     it('test create group', () => {
//         const groupId = '5';
//         const groupName = 'another group!';
//         const messages = [
//             {
//                 'message': 'test',
//                 'username': 'test',
//             }
//         ];
//         const userAction = {
//             'type': RECEIVE_USER_EVENT,
//             'payload': {
//                 'type': 'CREATE_GROUP_COMMAND',
//                 'group_id': groupId,
//                 'group_name': groupName,
//                 'messages': messages,
//             }
//         }
//         const state = chat(userAction);

//         expect(state.groups[groupId]).toEqual({
//             groupId,
//             groupName,
//             messages,
//         });
//     });

//     it('test delete group', () => {
//         const groupId = '1';
//         const userAction = {
//             'type': RECEIVE_USER_EVENT,
//             'payload': {
//                 'type': 'DELETE_GROUP_COMMAND',
//                 'group_id': groupId,
//             }
//         }
//         const state = chat(userAction);

//         expect(state.groups[groupId]).toBeUndefined();
//     });
// });

// describe('test chat action reducer', () => {

//     let initialState

//     beforeEach(() => {
//         initialState = getInitialState();
//     });

//     it('test message', () => {
//         const groupId = '1';
//         const message = {
//             'username': 'randomUser',
//             'message': 'HUH!',
//         };
//         const chatAction = {
//             'type': RECEIVE_CHAT_EVENT,
//             'payload': {
//                 ...message
//             },
//         };

//         const state = chat(chatAction);

//         const messages = state.groups[groupId].messages;

//         expect(messages[messages.length() - 1]).toEqual(message);
//     });

// });
