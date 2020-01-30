import React from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import App from '../app/index';
import Login from '../auth/login';
import Logout from '../auth/logout';
import Signup from '../auth/signup';

export default () => (
    <Router>
        <Switch>
            <Route path='/app'>
                <Switch>
                    <Route path='/'>
                        <App/>
                    </Route>
                </Switch>
            </Route>
            <Route path='/signup'>
                <Signup/>
            </Route>
            <Route path='/logout'>
                <Logout/>
            </Route>
            <Route>
                <Login/>
            </Route>
        </Switch>
    </Router>
);
