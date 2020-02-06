import React from 'react';

import {
    logout
} from '../api/auth';

import { logoutReceived } from '../actions';

export default class LogoutEndpoint extends React.Component {

    onComponentDidMount() {
        // send AJAX logout and redirect to / path
    }
}
