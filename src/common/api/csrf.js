import getCookie from './cookie'

let _csrfToken = null;

const getCsrf = async function() {

    if(!_csrfToken) {

        _csrfToken = getCookie('csrftoken');

        if(!_csrfToken) {
            await fetch('http://localhost:8000/csrf/', { credentials:'include' });
            _csrfToken = getCookie('csrftoken');
        }
    }
    else {
        throw 'Internal Server Error?';
    }

    return _csrfToken;
}

export default getCsrf;

export {
    _csrfToken as csrfToken
}
