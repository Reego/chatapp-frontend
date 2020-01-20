import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

export default () => (
    <Switch>
        <Route path='/login'>
            <p>Login</p>
        </Route>
        <Route path='/logout'>
            <p>Logout</p>
        </Route>
        <Route>
            <p>404: Page Not Found</p>
        </Route>
    </Switch>
)
