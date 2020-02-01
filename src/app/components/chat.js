import React from 'react';

import style from '../style.module.css';

const Chat = ({ conversation, username }) => {

    const chatItems = [];

    let lastSender = '';

    for(let i = 0; i < conversation['messages'].length; i++) {
        const message = conversation['messages'][i];
        const messageContent = message['content'];
        const sender = message[i]['username'];

        if(sender) {
            if(lastSender !== sender) {
                chatItems.push(
                    <Sender sender={'sender'} self={sender === username}/>
                );
            }
            chatItems.push(
                <Message content={messageContent} self={sender === username}/>
            );
        }
        else {
            chatItems.push(
                <LogMessage content={messageContent}/>
            );
        }
    }

    return (
        <div className={style.chat}>
            <div className={style.chatInner}>
                {/*<Sender sender={'Sender'}/>
                <Message content={'Wow'} self={false}/>
                <Message content={'Wow'} self={true}/>
                <LogMessage content={'User entered the chat'}/>
                <Sender sender={'Sender'}/>
                <Message content={'Wow'} self={false}/>
                <Sender sender={'Sender'}/>
                <Message content={'Wow'} self={false}/>
                <Message content={'Wow'} self={true}/>
                <LogMessage content={'User entered the chat'}/>
                <Sender sender={'Sender'}/>
                <Message content={'Wow'} self={false}/>
                <Sender sender={'Sender'}/>
                <Message content={'Wow'} self={false}/>
                <Message content={'Wow'} self={true}/>
                <LogMessage content={'User entered the chat'}/>
                <Sender sender={'Sender'}/>
                <Message content={'Wow'} self={false}/>*/}
                { chatItems }
            </div>
        </div>
    );
};

const Sender = ({ sender }) => (
    <div className={style.messageSender}>
        {sender}
    </div>
);

const Message = ({ content, self }) => {
    const messageClass = (self) ? style.self : style.other;

    return (
        <div className={style.message + ' ' + messageClass}>
            <span><p>{content}</p></span>
        </div>
    );
};

const LogMessage = ({ content }) => (
    <div className={style.logMessage}>{content}</div>
);
