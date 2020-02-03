import auth from './reducers';

import {
    loginReceived,
    logoutReceived
} from './actions';

import {
    LOGIN_RECEIVED,
    LOGOUT_RECEIVED
} from './actionTypes';

const username = 'USERNAME';
const otherUsername = 'OTHER_USERNAME';
let initialState;

beforeEach(() => {
    initialState = username;
});

it('test receiveLogin', () => {
    const finalState = auth(initialState, loginReceived(otherUsername));
    expect(finalState).toBe(otherUsername);
});

it('test receiveLogout', () => {
    const finalState = auth(initialState, logoutReceived());
    expect(finalState).toBe('');
});
