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
			type: 'password',
		}
	];
	return (
	<AuthLayout>
		<h1>Signup</h1>
		<AuthForm apiEndpoint='register' submitLabel='Signup' fields={fields}/>
	</AuthLayout>
	)
}
