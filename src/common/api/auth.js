import { fetchResource } from './api';

// const loginUrl = window.BASE_URL;

const LOGIN_PATH = '/auth/login';
const LOGOUT_PATH = '/auth/logout';

function tryLogin(credentials) {
    if(credentials.username && credentials.password) {
        return fetchResource(LOGIN_PATH, {
            credentials: 'include',
            body: {
                username: credentials.username,
                password: credentials.password,
            }
        });
    }
    else {
        throw new Exception("Credentials not provided");
    }
}

function logout(username) {
    if(credentials.username) {
        return fetchResource(LOGOUT_PATH)
    }
}

export const {
    tryLogin,
    logout
}
