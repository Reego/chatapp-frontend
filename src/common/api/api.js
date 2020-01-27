import getCookie from './cookie';
import getCsrf from './csrf';

import { receiveCsrfToken } from '../ducks/actions';

const API_URL = 'http://127.0.0.1:8000/api';

// credit to https://muffinman.io/simple-javascript-api-wrapper/

const fetchResource = function (path, userOptions = {}) {
    // Define default options
    const defaultOptions = {};
    // Define default headers
    const defaultHeaders = {
        'X-CSRFTOKEN': getCookie('csrftoken'),
    };

    const options = {
        // Merge options
        ...defaultOptions,
        ...userOptions,
        // Merge headers
        headers: {
          ...defaultHeaders,
          ...userOptions.headers,
        },
    };

    // Build Url
    const url = `${ API_URL }/${ path }`;

    // Detect is we are uploading a file
    const isFile = options.body instanceof File;

    // Stringify JSON data
    // If body is not a file
    if (options.body && typeof options.body === 'object' && !isFile) {
        options.body = JSON.stringify(options.body);
    }

    // Variable which will be used for storing response
    let response = null;

    return fetch(url, options)
            .then(responseObject => {
          // Saving response for later use in lower scopes
            response = responseObject;

          // HTTP unauthorized
            if (response.status === 401) {
            // Handle unauthorized requests
            // Maybe redirect to login page?
            }

          // Check for error HTTP error codes
            if (response.status < 200 || response.status >= 300) {
            // Get response as text
                return response.text();
            }

          // Get response as json
            return response.json();
        })
        // "parsedResponse" will be either text or javascript object depending if
        // "response.text()" or "response.json()" got called in the upper scope
        .then(parsedResponse => {
          // Check for HTTP error codes
            if (response.status < 200 || response.status >= 300) {
            // Throw error
                throw parsedResponse;
            }

          // Request succeeded
            return parsedResponse;
        })
        .catch(error => {
              // Throw custom API error
              // If response exists it means HTTP error occured
            if (response) {
                throw new ApiError(`Request failed with status ${ response.status }.`, error, response.status);
            }
            else {
                throw new ApiError(error.toString(), null, 'REQUEST_FAILED');
            }
        });
};

function safeApiCall(errAction = null) {
    // gets csrf
    // if valid csrf, do call,
    // else return error
    return function(target) {

        return function (dispatch) {

            return getCsrf()
                .then(() => {
                    dispatch(receiveCsrfToken(true));
                    dispatch(target);
                })
                .catch((err) => {
                    dispatch(receiveCsrfToken(false));
                    if(errAction) {
                        dispatch(errAction());
                    }
                });
        }
    }
}

export {
    fetchResource,
    safeApiCall
}
