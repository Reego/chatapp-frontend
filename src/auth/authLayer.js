import React from 'react';
import { connect } from 'react-redux';

import {
    loginReceived
} from './actions';

class AuthLayer extends React.Component {

    login() {
        this.dispatch()
    }
}

export default connect(
    ({username, loggedIn }}) => {
        username,
        loggedIn
    }
)(AuthLayer)
