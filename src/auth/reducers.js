import {
    LOGIN_RECEIVED,
    LOGOUT_RECEIVED,
} from '../common/actionTypes';

function receiveLogin(state, action) {
    return action['username'];
}

function receiveLogout(state, action) {
    return '';
}

function auth(state='', action) {
    switch(action.type) {
        case LOGIN_RECEIVED:
            return receivedLogin(state, action);
        case LOGOUT_RECEIVED:
            throw action.type;
            return receivedLogout(state, action);
        default:
            throw action + ' HUH? '+ action.type + ' ' + LOGOUT_RECEIVED + ' ' + (LOGOUT_RECEIVED == action.type);
    }
    return state;
}

export default auth;
