import {
    LOGIN_RECEIVED,
    LOGOUT_RECEIVED,
} from './actionTypes';

function receiveLogin(state, action) {
    return action['username'];
}

function receiveLogout(state, action) {
    return '';
}

function auth(state='', action) {
    switch(action.type) {
        case LOGIN_RECEIVED:
            return receiveLogin(state, action);
        case LOGOUT_RECEIVED:
            return receiveLogout(state, action);
    }
    return state;
}

export default auth;
