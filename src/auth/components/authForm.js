import React from 'react';

import style from '../style.module.css';

class AuthForm extends React.Component {

    render() {
        let inputs = [];
        for(let i = 0; i < this.props.fields.length; i++) {
            const fieldType = this.props.fields[i].type || 'text';
            inputs.push(
                <div key={i}>
                    <label>{this.props.fields[i].name}</label>
                    <input type={fieldType} name={this.props.fields[i].name} placeholder={this.props.fields[i].placeholder} required/>
                    <br/>
                </div>
            );
        }
        if(this.props.submitAuthForm !== undefined) {
        }
        const onSubmitForm = (this.props.submitAuthForm !== undefined)
            ? (e) => this.props.submitAuthForm(e, this.props.apiEndpoint)
            : (e) => this.submitAuthForm(e, this.props.apiEndpoint);
        return (
        <form onSubmit={onSubmitForm}>
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
