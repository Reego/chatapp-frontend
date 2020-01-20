import React from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Home from '../home/index';
import App from '../app/index';
import User from '../user/index';
import Login from '../auth/index';

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
            <Route path='/user'>
                <User/>
            </Route>
            <Route path='/signup'>

            </Route>
            <Route path='/logout'>

            </Route>
            <Route path='/verify'>

            </Route>
            <Route path={['/login', '/']}>
                <Login/>
            </Route>
        </Switch>
    </Router>
)
