import React from 'react'
import style from './style.module.css'

import AppLayout from '../common/components/appLayout';
import AppHeader from '../common/components/appHeader';

const Sidebar = () => (
    <div className={style.sidebar}>
        <div className={style.menuLabel}>Settings</div>
        <div className={style.menuItemsWrap}>
            <MenuItem itemName='Item'/>
            <MenuItem itemName='Item 2'/>
            <MenuItem itemName='Item 3'/>
        </div>
    </div>
)

const MenuItem = ({ itemName }) => (
    <div className={style.menuItem}>
        <span>
            {itemName}
        </span>
    </div>
)

const Main = () => (
    <div className={style.main}>
    </div>
)

export default () => (
    <AppLayout>
        <AppHeader/>
        <Sidebar/>
        <Main/>
    </AppLayout>
)
