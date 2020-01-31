import {
    LOGIN_RECEIVED,
    LOGOUT_RECEIVED
} from '../common/actionTypes';

function receiveLogin(state={}, action) {
    if(action.type === LOGIN_RECEIVED) {
        return {
            ...state,
            username: action['username'],
        };
    }
    return state;
}

function receiveLogout(state={}, action) {
    if(action.type === LOGOUT_RECEIVED) {
        return {
            ...state,
            username: '',
        };
    }
    return state;
}

export {
    receiveLogin,
    receiveLogout
};
