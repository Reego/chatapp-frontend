import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { tryFormLogin } from '../api/auth';

import {
    logoutReceived,
    loginReceived,
} from '../actions';

import AuthLayout from '../containers/authLayout';
import AuthForm from '../components/authForm';

class Login extends React.Component {

    render() {

        if(this.props.username) {
            return <Redirect to='/app'/>
        }
        const { dispatch } = this.props;
        let fields = [
            {
                name: 'Username',
                placeholder: 'Username',
            },
            {
                name: 'Password',
                placeholder: 'Password',
                fieldType: 'password',
            }
        ];
        return (
            <React.Fragment>
                <h1>Login</h1>
                <AuthForm submitAuthForm={this.submitForm.bind(this)} apiEndpoint='login' submitLabel='Login' fields={fields}/>
            </React.Fragment>
        );
    }

    submitForm(e) {
        e.preventDefault();


        tryFormLogin()
            .then(parsedResponse => {
                this.props.loginReceived(parsedResponse['username']);
            })
            .error(error => {
                this.props.logoutReceived();
            });
    }
}

export default connect(
    ({ username }) => {
        username
    },
    dispatch => {
        logoutReceived: () => dispatch(logoutReceived),
        loginReceived: (username) => dispatch(username),
    }
)(Login);
