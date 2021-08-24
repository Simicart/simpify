import React from 'react';
import { useApp } from 'src/drivers/Context';
import Loading from 'src/components/Loading';

const GlobalLoading = (props) => {
    const [{ isPageLoading }] = useApp();
    if (isPageLoading)
        return (
            <div
                className='simpify-global-loading'
                id='simpify-global-loading'
                style={{
                    height: '100%',
                    width: '100%',
                    position: 'fixed',
                    top: '0px',
                    display: 'flex',
                    background: '#ffffff',
                    zIndex: 100000,
                    opacity: 0.7,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Loading style={{ width: 50, height: 50 }} />
            </div>
        );
    return '';
};
export default GlobalLoading;
