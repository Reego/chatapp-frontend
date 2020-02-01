import React from 'react';
import { connect } from 'react-redux';

import style from './style.module.css';

import AppLayout from '../common/components/appLayout';
import AppHeader from '../common/components/appHeader';

import Chat from './components/chat';
import ChatBox from './components/chatBox';
import Sidebar from './components/sidebar';

class ChatApp extends React.Component {

    render() {

        const { chat, username } = this.props;

        let sidebarGroups = [];
        let currentConversation;

        chat['groups'].forEach(group => {
            if(group['current']) { // property needs to be set
                currentConversation = group;
            }
            groups.push({
                'groupName': group['group_name'],
                'read': group['read'],
            });
        });

        return (
            <AppLayout>
                <Sidebar groups={sidebarGroups}/>
                <div className={style.main}>
                    <AppHeader conversationName={currentConversation['group_name'] username={username}}/>
                    <Chat conversation={currentConversation} username={username}/>
                    <ChatBox send={this.send.bind(this)}/>
                </div>
            </AppLayout>
        );
    }

    send() {

    }

    componentDidMount() {
        // create web socket connection
    }
};

export default connect(
    ({ chat, username }) => { chat, username }
)(ChatApp);
