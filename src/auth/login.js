import React from 'react';
import { connect } from 'react-redux';

import AuthLayout from './index';
import AuthForm from './authForm';

class Login extends React.Component {

	render() {
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
				<AuthForm submitAuthForm={()=>dispatch({type:'RECEIVED_LOGIN', username: 'user'})} apiEndpoint='login' submitLabel='Login' fields={fields}/>
			</AuthLayout>
		);
	}
}

export default connect()(Login);
