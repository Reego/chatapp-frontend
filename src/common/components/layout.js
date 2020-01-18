import React from 'react';

import Header from './header';

import style from './layout.module.css';

const Layout = ({ children }) => (
    <React.Fragment>
        <div className={style.layout}>
		<Header title='Chat App'/>
		{/*Extra menu*/}
        	<div className={style.main}>	
		{children}
		</div>
	</div>
    </React.Fragment>
)

export default Layout;
