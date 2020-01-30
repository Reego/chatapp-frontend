import {
    LOGIN_RECEIVED,
    LOGOUT_RECEIVED
} from './actionTypes';

function receiveLogin(state={}, action) {
    if(action.type === LOGIN_RECEIVED) {
        state['username'] = action['username'];
        state['loggedIn'] = true;
        return {
            ...state,
            username: action['username'],
            loggedIn: true,
        };
    }
    return state;
}

function receiveLogout(state={}, action) {
    if(action.type === LOGOUT_RECEIVED) {
        return {
            ...state,
            username: '',
            loggedIn: false,
        };
    }
    return state;
}

export {
    receiveLogin,
    receiveLogout
};
