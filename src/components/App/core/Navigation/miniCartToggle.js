import React from 'react';
import { useApp } from 'src/drivers/Context';
import BasketIcon from 'src/components/Icons/Basket';

const MenuToggle = (props) => {
    const [, { toggleDrawer }] = useApp();
    return (
        <div onClick={() => toggleDrawer('cart')} className='right-bar-item'>
            <BasketIcon />
        </div>
    );
};

export default MenuToggle;
