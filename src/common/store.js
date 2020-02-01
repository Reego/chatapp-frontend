import { createStore } from 'redux';
import reducer from './reducers';

// const initialState = {
//     chat: {
//         groups: {
//             groupId: {
//                 groupId,
//                 groupName,
//                 messages: []
//             }
//         }
//         currentGroupId
//     }
//     user: {
//         username,
//     },
// }

const initialState = {}

// cache has a maximum of 10 chats

export default () => {
    return createStore(reducer, initialState);
}
