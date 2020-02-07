import React from 'react';

import style from './appHeader.module.css';

export default ({groupName, username}) => (
    <div className={style.header}>
        <span>{groupName}</span>
        <span>{username}</span>
    </div>
)
