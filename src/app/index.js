import React from 'react';
import { connect } from 'react-redux';

import {
    receiveWebSocketEvent,
    disconnectWebSocket,
    receiveChangeCurrentGroup,
    receiveReadMessage,
} from './actions';

import style from './style.module.css';

import AppLayout from './components/appLayout';
import AppHeader from './components/appHeader';

import AuthLayer from '../auth/containers/authLayer';

import Chat from './components/chat';
import ChatBox from './components/chatBox';
import Sidebar from './components/sidebar';

const WS_PATH = 'ws://127.0.0.1:8000/ws/chat/';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.dispatch = this.props.dispatch;
    }

    render() {

        let { chat, username } = this.props;

        let sidebarGroups = [];
        let currentConversation;

        if(chat['groups'] !== undefined) {

            for(let groupId in chat['groups']) {
                const group = chat['groups'][groupId];
                if(group['groupId'] === chat['currentGroupId']) { // property needs to be set
                    currentConversation = group;
                }
                sidebarGroups.push({
                    'groupName': group['groupName'],
                    'groupId': group['groupId'],
                    'read': group['read'],
                });
            }
        }
        else if(!username) {
            currentConversation = {
                'groupName': 'Group Name',
                'messages': [
                    {
                        'content': 'WOW A MESSAGE!',
                        'username': 'Username'
                    },
                    {
                        'content': 'Okay, not gonna like, dis cool',
                        'username': 'Okre'
                    },

                ],
            };
            username = 'Username';
        }
        const currentConversationName = (currentConversation) ? currentConversation['groupName'] : '';

        const emptyChat = sidebarGroups.length > 0;

        return (
            <AppLayout>
                <Sidebar groupChangeEvent={this.groupChange.bind(this)} sidebarEvent={
                    () => this.send.bind(this)(this.webSocketMessage('USER', 'CREATE'))
                } groups={sidebarGroups}/>
                <div className={style.main}>
                    <AppHeader groupName={currentConversationName} username={username}/>
                    <Chat conversation={currentConversation} username={username}/>
                    { emptyChat &&
                        <ChatBox send={this.sendMessage.bind(this)}/>
                    }
                </div>
            </AppLayout>
        );
    }

    send(payload) {
        this.webSocket.send(JSON.stringify(payload));
    }

    groupChange(groupId) {
        this.dispatch(receiveChangeCurrentGroup(groupId));
        this.send(this.webSocketMessage('USER', 'READ', {'group_id': this.props.chat.currentGroupId}));
        this.props.dispatch(receiveReadMessage(groupId));
    }

    webSocketMessage(type, subType, body={}) {
        return {
            'type': type,
            'body': {
                'type': subType,
                ...body,
            }
        };
    }

    sendMessage(message, isCommand) {

        if(isCommand) {
            const args = message.split(' ');
            if(args.length > 0) {
                if(args[0] === 'LEAVE') {
                    this.send(this.webSocketMessage('USER', 'DELETE',
                        {
                            'group_id': this.props.chat.currentGroupId,
                            'command': args[0],
                        },
                    ));
                }
                else {
                    this.send(this.webSocketMessage('CHAT', 'COMMAND',
                        {
                            'group_id': this.props.chat.currentGroupId,
                            'message': message,
                            'username': (args.length >= 2) ? args[1] : '',
                            'command': args[0],
                        }
                    ));
                }
            }
            return;
        }
        this.send(this.webSocketMessage('CHAT', 'MESSAGE',
            {
                'group_id': this.props.chat.currentGroupId,
                'message': message,
                'username': this.props.username,
            }
        ));
    }

    // called when receiving a message
    receive(e) {
        const data = JSON.parse(e.data);
        this.dispatch(receiveWebSocketEvent(data));
    }

    close() {
        console.log('Web Socket Connetion Closed')
        this.dispatch(disconnectWebSocket);
    }

    componentDidMount() {
        // create web socket connection

        this.webSocket = new WebSocket(
            WS_PATH
        );

        this.webSocket.onmessage = this.receive.bind(this);
        this.webSocket.onopen = () => {
            this.send({'type': 'INIT'});
        };
    }

    componentWillUnmount() {
        this.dispatch(disconnectWebSocket);
    }
};

const ChatAppContainer = connect(
    ({ chat, username }) => {
        return { chat, username }
    },
)(App);

export default () =>
    (<AuthLayer>
        <ChatAppContainer/>
    </AuthLayer>);
