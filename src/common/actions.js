import { RECEIVE_CSRF_TOKEN } from './actionTypes';

function receiveCsrfToken(token) {
    return {
        type: RECEIVE_CSRF_TOKEN
    }
}

export {
    receiveCsrfToken
};
