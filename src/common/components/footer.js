import React from 'react';

import style from './footer.module.css';

const Main = () => (
	<div className={style.footerMain}>
		<div></div>
		<div></div>
		<div></div>
	</div>
)

const Sub = () => (
	<div className={style.footerSub}>
		<span>Copyright Reego Development 2020</span>
	</div>
)

export default () => (
    <div className={style.footer}>
        <Main/>
	<Sub/>
    </div>
)
