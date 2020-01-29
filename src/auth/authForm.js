import React from 'react';

import style from './style.module.css';

class AuthForm extends React.Component {
	
	render() {
		let inputs = [];
		for(let i = 0; i < this.props.fields; i++) {
			const fieldType = this.props.field[i].type || 'text'
			inputs.append(
				<input type={fieldType} name={this.props.fields[i].name} key={i} placeholder={this.props.fields[i].placeholder} required/>
			);
		}
		return (
		<form onSubmit={(e)=>this.submitAuthForm(e, this.props.apiEndpoint)}>
			{ inputs }
			<input type='submit' value={this.props.submitLabel}/>
		</form>
		);
	}

	submitAuthForm(e, apiEndpoint) {
		// api call
		e.preventDefault();
	}
}

export default AuthForm;
