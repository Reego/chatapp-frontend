import { combineReducers } from 'redux';

import * from '../app/reducers' as appReducers;

const reducer = combineReducers({
    ...appReducers
});

export default reducer;
