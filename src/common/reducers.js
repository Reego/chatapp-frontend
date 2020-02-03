import { combineReducers } from 'redux';

import chatReducer from '../app/reducers';
import authReducer from '../auth/reducers';

const reducer = combineReducers({
    'chat': chatReducer,
    'username': authReducer,
});

export default reducer;
