import React from 'react';
import { Redirect } from 'react-router-dom';

import {
    logout
} from '../api/auth';

import { logoutReceived } from '../actions';

export default class LogoutEndpoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    render() {
        if(this.state.redirect) {
            return <Redirect to='/login'/>
        }
        return null;
    }

    componentDidMount() {
        
	logout();
	// send AJAX logout and redirect to / path
        this.setState({
            redirect: true
        });
    }
}
