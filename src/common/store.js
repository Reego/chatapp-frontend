import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {}

export default () => {
    return createStore(reducer, initialState);
}
