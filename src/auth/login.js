import React from 'react';

import AuthLayout from './index';
import AuthForm from './authForm';

export default () => {
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
		<AuthForm apiEndpoint='login' submitLabel='Login' fields={fields}/> 
	</AuthLayout>
	);
};
