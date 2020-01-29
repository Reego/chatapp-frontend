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
		<p>Signup</p>
		<AuthForm apiEndpoint='register' submitLabel='Signup' fields={fields}/>
	</AuthLayout>
	)
}
