import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import getCsrf from '../../common/api/csrf';

import {
    logout
} from '../api/api';

import { logoutReceived } from '../actions';

class LogoutEndpoint extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            redirect: false
        };
    }

    render() {
        if(this.state.redirect) {
            if(this.props.username) {
                return <Redirect to='/app'/>
            }
            return <Redirect to='/login'/>
        }
        return null;
    }

    componentDidMount() {

        getCsrf().then(()=>
            logout()
                .then(parsedResponse => {
                    this.props.logoutReceived();

                    console.log('whoa');

                    this.setState({
                        redirect: true
                    });
                })
                .catch(()=>{
                    this.setState({
                        redirect: true
                    });
                })
            );
	// send AJAX logout and redirect to / path
    }
}

export default connect(
    ({ username }) => ({
        username
    }),
    dispatch => ({
        logoutReceived: () => dispatch(logoutReceived()),
    })
)(LogoutEndpoint);
