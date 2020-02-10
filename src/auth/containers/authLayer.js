import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { tryPingLogin } from '../api/auth';

import {
    logoutReceived,
    loginReceived
} from '../actions';

class AuthLayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    render() {
        if(this.props.username) {
            return (
                <React.Fragment>
                    { this.props.children }
                </React.Fragment>
            );
        }
        else if(this.state.redirect) {
            return <Redirect to='/login'/>
        }
    }

    componentDidMount() {
        if(!this.props.username) {
            this.tryPingLogin()
                .then(parsedResponse => {
                    const username = parsedResponse['username'];
                    if(username) {
                        this.props.loginReceived(parsedResponse['username']);
                    }
                    else {
                        throw 'Failed PING Authenticated';
                    }
                })
                .catch(error => {
                    this.props.logoutReceived();
                    this.setState({ redirect: true });
                });
        }
    }
}

export default connect(
    ({ username }) => ({
        username
    }),
    dispatch => {
        return {
            logoutReceived: () => dispatch(logoutReceived()),
            loginReceived: (username) => dispatch(loginReceived(username)),
        };
    }
)(AuthLayer);
