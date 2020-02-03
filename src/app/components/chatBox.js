import React from 'react';

import style from './style.module.css';

class ChatBox extends React.Component {

    constructor(props) {
        super(props);

        this.send = this.props.send;
        this.inputRef = React.createRef();
    }

    render() {
        return (
            <div className={style.input}>
                <input onKeyPress={this.inputKeyPress.bind(this)} ref={this.inputRef} placeholder='Message...'/>
            </div>
        );
    }

    inputKeyPress(e) {
        if(e.key === 'Enter') {
            if(e.target.value) {
                this.sendMessage(e.target.value);
                e.target.value = '';
            }
        }
    }

    sendMessage(message) {
        let isCommand = false;
        if(message[0] === '/' && message.length > 1) {
            message = message.substring(1);
            isCommand = true;
        }
        this.send(message, isCommand);
    }
}

export default ChatBox;

// export default connect(
//     null,
//     () => {
//         send: () => sendChatMessage(),
//     },
// )(ChatInput);
