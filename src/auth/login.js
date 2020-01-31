import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { tryFormLogin } from '../common/api/auth';

import {
	logoutReceived,
    loginReceived,
} from '../common/actions';

import AuthLayout from './index';
import AuthForm from './authForm';

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
			<AuthLayout>
				<h1>Login</h1>
				<AuthForm submitAuthForm={this.submitForm.bind(this)} apiEndpoint='login' submitLabel='Login' fields={fields}/>
			</AuthLayout>
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
