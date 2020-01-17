import React from 'react';

import Header from './header';
import Footer from './footer';

import style from './layout.module.css';

const Layout = ({ children }) => (
    <React.Fragment>
        <Header title='Chat App'/>
        {children}
        <Footer/>
    </React.Fragment>
)

export default Layout;
