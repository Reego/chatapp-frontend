import React from 'react';

import style from './header.module.css';

const Navigation = () => (
    <React.Fragment>
        <span>home</span>{/* accessible at /home, / redirects to /home when not logged in */}
        <span>about</span>
        <span>login</span>
        <span>account</span>
        <span>chats</span>{/* home page if logged in */}
    </React.Fragment>
)

export default ({ title }) => (
    <React.Fragment>
        <div className={style.header}>
            <div className={style.headerTitleWrap}>{title}</div>
            <div className={style.headerNavigationWrap}>
                <Navigation/>
            </div>
        </div>
    </React.Fragment>
)
