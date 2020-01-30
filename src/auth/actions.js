import {
    LOGIN_RECEIVED,
    LOGOUT_RECEIVED
} from './actionTypes';

function loginReceived(username) {
    return {
        type: LOGIN_RECEIVED,
        username
    };
}

function logoutReceived() {
    return {
        type: LOGOUT_RECEIVED
    };
}

export {
    loginReceived,
    logoutReceived
};
