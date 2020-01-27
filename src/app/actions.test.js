import {
    receiveUserEvent,
    receiveChatEvent,
} from './actions';

import {
    RECEIVE_USER_EVENT,
    RECEIVE_CHAT_EVENT,
} from './actionTypes';

const payload = { 'test': true };

it('testing receiveUserEvent', () => {
    const expectedResult = {
        type: RECEIVE_USER_EVENT,
        payload,
    };
    expect(receiveUserEvent(payload)).toEqual(expectedResult);
});

it('testing receiveChatEvent', () => {
    const expectedResult = {
        type: RECEIVE_CHAT_EVENT,
        payload,
    };
    expect(receiveChatEvent(payload)).toEqual(expectedResult);
});
