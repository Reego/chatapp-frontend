import {
    loginReceived,
    logoutReceived
} from './actions';

import {
    LOGIN_RECEIVED,
    LOGOUT_RECEIVED
} from './actionTypes';

it('test loginReceived', () => {
    const username = 'USERNAME';
    const action = loginReceived(username);
    expect(action['username']).toEqual(username) &&
    expect(action['type']).toBe(LOGIN_RECEIVED);
});

it('test logoutReceived', () => {
    const action = logoutReceived();
    expect(action['type']).toBe(LOGOUT_RECEIVED);
});
