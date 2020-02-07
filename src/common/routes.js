import React from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import App from '../app/index';
import Login from '../auth/components/login';
import Logout from '../auth/components/logout';
import Signup from '../auth/components/signup';

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
