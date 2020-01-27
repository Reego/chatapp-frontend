import {
    RECEIVE_USER_EVENT,
    RECEIVE_CHAT_EVENT,
} from './actionTypes';

import {
    chat
} from './reducers';

const userCreateGroupAction = {
    type: RECEIVE_USER_EVENT,
    payload: {
        'group_id': 1,
        'group_name': 'sample_name',
    }
}

const userDeleteGroupAction = {
    type: RECEIVE_USER_EVENT,
    payload: {
        'group_id': 1,
        'group_name': 'sample_name',
    }
}

const chatAction = {
    type: RECEIVE_CHAT_EVENT,
    payload: {
        'group_id': 1,
        'message': {
            username: ''
        }
    }
}

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
        const sampleAction = {'type':''};
        expect(chat(undefined, sampleAction)).toBeDefined();
    });

    it('test RECEIVE_USER_EVENT with undefined initial', () => {
        const sampleAction = { type: RECEIVE_USER_EVENT };
        expect(chat(undefined, sampleAction)).toBeDefined();
    });

    it('test RECEIVE_CHAT_EVENT with undefined initial', () => {
        const sampleAction = { type: RECEIVE_CHAT_EVENT };
        expect(chat(undefined, sampleAction)).toBeDefined();
    });
});

describe('test user action reducer', () => {

    let initialState = {};

    beforeEach(() => {
        initialState = getInitialState();
    });

    it('test create group', () => {
        const groupId = '5';
        const groupName = 'another group!';
        const messages = [
            {
                'message': 'test',
                'username': 'test',
            }
        ];
        const userAction = {
            'type': RECEIVE_USER_EVENT,
            'payload': {
                'type': 'CREATE_GROUP_COMMAND',
                'group_id': groupId,
                'group_name': groupName,
                'messages': messages,
            }
        }
        const state = chat(userAction);

        expect(state.groups[groupId]).toEqual({
            groupId,
            groupName,
            messages,
        });
    });

    it('test delete group', () => {
        const groupId = '1';
        const userAction = {
            'type': RECEIVE_USER_EVENT,
            'payload': {
                'type': 'DELETE_GROUP_COMMAND',
                'group_id': groupId,
            }
        }
        const state = chat(userAction);

        expect(state.groups[groupId]).toBeUndefined();
    });
});

describe('test chat action reducer', () => {

    let initialState

    beforeEach(() => {
        initialState = getInitialState();
    });

    it('test message', () => {
        const groupId = '1';
        const message = {
            'username': 'randomUser',
            'message': 'HUH!',
        };
        const chatAction = {
            'type': RECEIVE_CHAT_EVENT,
            'payload': {
                ...message
            },
        };

        const state = chat(chatAction);

        const messages = state.groups[groupId].messages;

        expect(messages[messages.length() - 1]).toEqual(message);
    });

});
