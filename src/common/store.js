import { createStore } from 'redux';
import reducer from './reducers';

const initialState = {
    user: {
        username,
    },
    cache: [
        chatId : {
            messages: [
                {

                },
                {

                }
            ],
        }
    ],
    chats: [
        {
            'chatId',
            'chatName',
            'users'
        }
    ]
}

// cache has a maximum of 10 chats

export default () => {
    return createStore(reducer, initialState);
}
