import React from 'react';
import { useApp } from 'src/drivers/Context';
import CloseIcon from 'src/components/Icons/Close';
import './leftMenu.scss';

const LeftMenu = (props) => {
    const [appState, { toggleDrawer }] = useApp();
    const rootClassName =
        appState && appState.drawer === 'nav'
            ? 'left-nav-drawer active'
            : 'left-nav-drawer';
    return (
        <aside className={rootClassName}>
            <header className='header' onClick={() => toggleDrawer(false)}>
                <CloseIcon />
            </header>
            <div className='body'>Collections</div>
            <div className='footer'>
                <div className='switcher'>Store/currency swithder</div>
                Sign in/sign up/sign out
            </div>
        </aside>
    );
};

export default LeftMenu;
