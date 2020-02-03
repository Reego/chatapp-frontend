import {
    disconnectWebSocket,
    receiveWebSocketEvent,
} from './actions';

import {
    DISCONNECT_WEB_SOCKET,
    RECEIVE_WEB_SOCKET_EVENT,
} from './actionTypes';

const payload = { 'test': true };

it('testing disconnectWebSocket', () => {
    const expected = {
        type: DISCONNECT_WEB_SOCKET,
    }
    expect(disconnectWebSocket()).toEqual(expected);
});

it('testing receiveUserEvent', () => {
    const expectedResult = {
        type: RECEIVE_WEB_SOCKET_EVENT,
        payload,
    };
    expect(receiveWebSocketEvent(payload)).toEqual(expectedResult);
});
