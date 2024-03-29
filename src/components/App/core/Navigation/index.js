import React from 'react';
import BasketIcon from 'src/components/Icons/Basket';
import { Link } from 'src/drivers';
import { useWindowSize } from 'src/drivers/Context';
import { logoUrl } from 'src/util/Url';
import LeftMenu from './LeftMenu';
import MenuToggle from './menuToggle';

import './navigation.scss';

const Navigation = (props) => {
    const windowSize = useWindowSize();
    const isPhone = windowSize.innerWidth < 1024;

    return (
        <div className='navigation-wrapper'>
            <div className='container'>
                <div className='header-app-bar'>
                    <div className='left-bar'>
                        <MenuToggle />
                    </div>
                    <div className='header-logo'>
                        <Link to='/'>
                            <img
                                src={logoUrl()}
                                alt='simpify-logo'
                                style={
                                    !isPhone
                                        ? { width: 240, height: 40 }
                                        : { width: 180, height: 30 }
                                }
                            />
                        </Link>
                    </div>
                    <div className='right-bar'>
                        <Link to='/cart' className='right-bar-item'>
                            <BasketIcon />
                        </Link>
                    </div>
                </div>
            </div>
            {isPhone ? <LeftMenu /> : ''}
        </div>
    );
};
export default Navigation;
