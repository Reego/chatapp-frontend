import { combineReducers } from 'redux';

import * as appReducers from '../app/reducers';

const reducer = combineReducers({
    ...appReducers
});

export default reducer;
