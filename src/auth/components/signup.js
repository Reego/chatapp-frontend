import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { tryFormSignup } from '../api/auth';

import {
    loginReceived,
} from '../actions';

import AuthForm from './authForm';

class Signup extends React.Component {

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
                type: 'password',
            }
        ];
        return (
        <React.Fragment>
            <h1>Signup</h1>
            <AuthForm apiEndpoint='register' submitLabel='Signup' fields={fields}/>
        </React.Fragment>
        );
    }

    submitForm(e) {
        e.preventDefault();


        tryFormSignup()
            .then(parsedResponse => {
                this.props.loginReceived(parsedResponse['username']);
            })
            .error(error => {
                console.log('Failed to signup');
            });
    }
}

export default connect(
    ({ username }) => ({
        username
    }),
    dispatch => ({
        loginReceived: (username) => dispatch(username),
    })
)(Signup);
