import React from 'react';
import MenuIcon from 'src/components/Icons/Menu';
import { useApp } from 'src/drivers/Context';

const MenuToggle = (props) => {
    const [, { toggleDrawer }] = useApp();
    return (
        <div onClick={() => toggleDrawer('nav')} className='left-bar-item'>
            <MenuIcon color='#333132' style={{ width: 30, height: 30 }} />
        </div>
    );
};

export default MenuToggle;
