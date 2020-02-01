import React from 'react';

import style from './style.module.css';

class ChatBox extends React.Component {

    constructor(props) {
        super(props);

        this.send = this.props.send;
    }

    render() {
        return (
            <div className={style.input}>

            </div>
        );
    }

    sendMessage() {
        this.props.send();
    }
}

export default ChatBox;

// export default connect(
//     null,
//     () => {
//         send: () => sendChatMessage(),
//     },
// )(ChatInput);
