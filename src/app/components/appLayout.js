import React from 'react';
import style from './appLayout.module.css';

export default ({ children }) => (
    <div className={style.appLayout}>
        {children}
    </div>
)
