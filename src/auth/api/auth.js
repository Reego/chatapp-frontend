// import { fetchResource } from './api';

// import { loginReceived } from '../actions';

// // const loginUrl = window.BASE_URL;

// const LOGIN_PATH = '/auth/login';
// const LOGOUT_PATH = '/auth/logout';
// const SIGNUP_PATH = '/auth/signup';

// function tryFormLogin(credentials) {
//     if(credentials.username && credentials.password) {
//         return fetchResource(LOGIN_PATH, {
//             credentials: 'include',
//             method: 'POST',
//             body: {
//                 username: credentials.username,
//                 password: credentials.password,
//             }
//         });
//     }
//     else {
//         throw new Exception("Credentials not provided");
//     }
// }

// function tryPingLogin() { // this address should return username in back-end
//     return fetchResource(LOGIN_PATH, {
//         credentials: 'include',
//         method: 'POST',
//     });
// }

// function logout() {
//     return fetchResource(LOGOUT_PATH, {
//         credentials: 'include',
//         method: 'POST',
//     });
// }

// function tryFormSignup() {
//     return fetchResource(SIGNUP_PATH, {
//         credentials: 'include',
//         method: 'POST',
//     });
// }

// export {
//     tryFormLogin,
//     tryPingLogin,
//     tryFormSignup,
//     logout
// };
