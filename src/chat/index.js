import React from 'react';

const ChatsList = () => (
    <p>Groups and Private Messages</p>
    <p>Also delete and add options</p>
)

const CurrentChat = () => (
    <p>Messages and input box</p>
)

export default () => (
    <React.Fragment>
        <ChatsList/>
        <CurrentChat/>
    </React.Fragment>
)
