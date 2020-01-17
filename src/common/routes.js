import React from 'react';
import {
    Switch,
    BrowserRouter as Router,
    Route
} from 'react-router-dom';

import Layout from './components/layout';
import Home from '../home/index';

export default () => (
    <Router>
        <Layout>
            <Switch>
                <Route path='/'>
                    <Home/>
                </Route>
                <Route>
                    <h1>404: Page Not Found</h1>
                </Route>
            </Switch>
        </Layout>
    </Router>
)
