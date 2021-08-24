import React from 'react';
import './toastMessage.scss';

const ToastMessage = (props) => {
    return (
        <div id='toast-message-global' style={{ display: 'none' }}>
            <div id='toast-message-content'></div>
        </div>
    );
};
export default ToastMessage;
