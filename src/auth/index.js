import React from 'react';
import style from './style.module.css';

export default ({ children }) => (
    <div className={style.bg}>
        <div className={style.mainCard}>
	{children}
        </div>
    </div>
)
