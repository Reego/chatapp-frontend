import React from 'react';
import { Provider } from 'react-redux';

import Routes from './common/routes';
import createStore from './common/store';

const store = createStore();

function App() {
    return (
        <Provider store={store}>
            <Routes/>
        </Provider>
    );
}

export default App;
