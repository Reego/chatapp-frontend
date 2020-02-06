import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import { tryPingLogin } from './auth';

import {
    logoutReceived,
    loginReceived
} from '../common/actions';

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
                    this.props.loginReceived(parsedResponse['username']);
                })
                .catch(error => {
                    this.props.logoutReceived();
                    this.setState({ redirect: true });
                });
        }
    }
}

export default connect(
    ({ username }}) => {
        username
    },
    dispatch => {
        logoutReceived: () => dispatch(logoutReceived()),
        loginReceived: (username) => dispatch(loginReceived(username)),
    }
)(AuthLayer);
