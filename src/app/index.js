import React from 'react'
import style from './style.module.css'

import AppLayout from '../common/components/appLayout';
import AppHeader from '../common/components/appHeader';

const Sidebar = () => (
    <div className={style.sidebar}>
        <div className={style.groupsLabel}>Messages</div>
        <div className={style.groupsWrap}>
            <Group groupName='Group'/>
            <Group groupName='Group 2'/>
            <Group groupName='Group 3'/>
        </div>
    </div>
)

const Group = ({ groupName, notification }) => (
    <div className={style.group}>
        <span className={style.groupName}>
            {groupName}
        </span>
        <div className={style.notification}></div>
    </div>
)

const Main = () => (
    <div className={style.main}>
        <AppHeader/>
        <Chat/>
        <Input/>
    </div>
)

const Chat = () => (
    <div className={style.chat}>
        <div className={style.chatInner}>
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
            <Message content={'Wow'} self={false}/>
            <Sender sender={'Sender'}/>
            <Message content={'Wow'} self={false}/>
            <Message content={'Wow'} self={true}/>
            <LogMessage content={'User entered the chat'}/>
            <Sender sender={'Sender'}/>
            <Message content={'Wow'} self={false}/>
        </div>
    </div>
)

const Sender = ({ sender }) => (
    <div className={style.messageSender}>
        {sender}
    </div>
)

const Message = ({ content, self }) => {
    const messageClass = (self) ? style.self : style.other;

    return (
        <div className={style.message + ' ' + messageClass}>
            <span><p>{content}</p></span>
        </div>
    )
}

const LogMessage = ({ content }) => (
    <div className={style.logMessage}>{content}</div>
)

const Input = () => (
    <div className={style.input}>
    </div>
)

export default () => (
    <AppLayout>
        <Sidebar/>
        <Main/>
    </AppLayout>
)
