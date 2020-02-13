import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import getCsrf from '../../common/api/csrf';

import { tryFormLogin } from '../api/api';

import {
    logoutReceived,
    loginReceived,
} from '../actions';

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

        const elements = e.target.elements;

        const username = elements['Username'].value;//elements['username'];
        const password = elements['Password'].value;//elements['password'];

        getCsrf().then(() =>
            tryFormLogin({
                username,
                password
            })
                .then(parsedResponse => {
                    const username = parsedResponse['username'];
                    if(username) {
                        this.props.loginReceived(parsedResponse['username']);
                    }
                    else {
                        throw 'Authenticated Failed';
                    }
                })
                .catch(error => {
                    console.log(error);
                    console.log('Failed to login');
                    //this.props.logoutReceived();
                })
            )
            .catch(error => {
                console.log(error);
                console.log('Failed to login');
            });
    }
}

export default connect(
    ({ username }) => ({
        username
    }),
    dispatch => ({
        logoutReceived: () => dispatch(logoutReceived()),
        loginReceived: (username) => dispatch(loginReceived(username)),
    })
)(Login);
