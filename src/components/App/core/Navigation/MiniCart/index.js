import React from 'react';
import { useApp, useCartContext } from 'src/drivers/Context';
import CloseIcon from 'src/components/Icons/Close';
import './miniCart.scss';

const MiniCart = (props) => {
    const [appState, { toggleDrawer }] = useApp();
    const [{ cart }] = useCartContext();
    console.log(cart);
    const rootClassName =
        appState && appState.drawer === 'cart'
            ? 'minicart-drawer active'
            : 'minicart-drawer';
    return (
        <aside className={rootClassName}>
            <header className='header' onClick={() => toggleDrawer(false)}>
                <CloseIcon />
            </header>
            <div className='body'>Mini Cart</div>
        </aside>
    );
};

export default MiniCart;
