import getCookie from './cookie'

let _csrfToken = null;

const getCsrf = async function() {

    if(!_csrfToken) {

        _csrfToken = getCookie('csrftoken');

        if(!_csrfToken) {
            await fetch('http://127.0.0.1:8000/csrf/', { credentials:'include' });
            _csrfToken = getCookie('csrftoken');
            alert(_csrfToken);
        }
    }
    else {
        throw 'Internal Server Error?';
    }

    return _csrfToken;
}

const alternate = async function() {
    return new Promise();
}

export default getCsrf;

export {
    _csrfToken as csrfToken
}
