import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { tryFormSignup } from '../api/api';
import getCsrf from '../../common/api/csrf';

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
            <AuthForm submitAuthForm={this.submitForm.bind(this)} apiEndpoint='register' submitLabel='Signup' fields={fields}/>
        </React.Fragment>
        );
    }

    submitForm(e) {
        e.preventDefault();

        const elements = e.target.elements;

        const username = elements['Username'].value;//elements['username'];
        const password = elements['Password'].value;//elements['password'];

        getCsrf().then(() =>
            tryFormSignup({
                username,
                password
            })
                .then(parsedResponse => {
                    this.props.loginReceived(parsedResponse['username']);
                })
                .catch(error => {
                    console.log(error);
                    console.log('Failed to signup');
                })
            );
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
