import React from 'react';

import style from '../style.module.css';

const Group = ({ groupName, notification }) => (
    <div className={style.group}>
        <span className={style.groupName}>
            {groupName}
        </span>
        <div className={style.notification}></div>
    </div>
);

const Sidebar = ({ groups, sidebarEvent }) => {

    const groupTags = [];

    for(let i = 0; i < groups.length; i++) {
        groupTags.push(
            <Group groupName={groups[i]['groupName']} key={i}/>
        );
    }

    return (
        <div className={style.sidebar}>
            <div className={style.groupsLabel}>Messages</div>
            <div className={style.groupsWrap}>
                { groupTags }
            </div>
            <div className={style.groupCreate} OnClick={sidebarEvent}>New Group</div>
        </div>
    );
};

export default Sidebar;
