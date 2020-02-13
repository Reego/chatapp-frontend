import React from 'react';

import style from '../style.module.css';

class Chat extends React.Component {

    render() {
        const { conversation, username } = this.props;

        const chatItems = [];

        if(conversation && 'messages' in conversation) {

            let lastSender = '';

            for(let i = 0; i < conversation['messages'].length; i++) {
                const message = conversation['messages'][i];
                const messageContent = message['message'];
                const sender = message['username'];

                if(sender) {
                    if(lastSender !== sender && sender !== username) {
                        chatItems.push(
                            <Sender sender={sender} key={i*3}/>
                        );
                        lastSender = sender;
                    }
                    chatItems.push(
                        <Message content={messageContent} self={sender === username} key={i*3+1}/>
                    );
                }
                else {
                    chatItems.push(
                        <LogMessage content={messageContent} key={i*3+2}/>
                    );
                }
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
                    <div style={{float:'left', clear:'both'}} ref={(el)=>{ this.messagesEnd = el; }}></div>
                </div>
            </div>
        );
    }

    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }
}

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

export default Chat;
