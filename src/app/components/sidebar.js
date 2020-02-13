import React from 'react';

import style from '../style.module.css';

const Group = ({ groupName, groupId, notification, groupChangeEvent }) => (
    <div onClick={()=>groupChangeEvent(groupId)} className={style.group + ((notification) ? (' ' + style.notificationActive) : '')}>
        <span className={style.groupName}>
            {groupName}
        </span>
    </div>
);

const Sidebar = ({ groups, sidebarEvent, groupChangeEvent }) => {

    const groupTags = [];

    for(let i = 0; i < groups.length; i++) {
        groupTags.push(
            <Group groupChangeEvent={groupChangeEvent} groupId={groups[i]['groupId']} notification={groups[i]['read']} groupName={groups[i]['groupName']} key={i}/>
        );
    }

    return (
        <div className={style.sidebar}>
            <div className={style.groupsLabel}>Messages</div>
            <div className={style.groupsWrap}>
                { groupTags }
            </div>
            <div className={style.groupCreate} onClick={sidebarEvent}>New Group</div>
        </div>
    );
};

export default Sidebar;
