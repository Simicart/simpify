import React from 'react';
import './topMessage.scss';
import ErrorIcon from 'src/components/Icons/Error';
import Success from 'src/components/Icons/Success';
import WarningIcon from 'src/components/Icons/Warning';
import CloseIcon from 'src/components/Icons/Close';
import { useTopMessage } from 'src/drivers/Context';

const TopMessage = (props) => {
    const [messages, { removeMessage }] = useTopMessage();

    const renderMsg = (msg, id) => {
        if (msg.auto_dismiss) {
            setTimeout(function () {
                removeMessage(id);
            }, 3000);
        }
        let data = {
            className: 'message-warning',
            label: 'Warning',
            text: msg.message,
            iconColor: '#333132',
            icon: <WarningIcon color='#333132' />,
        };
        if (msg.type === 'success') {
            data = {
                className: 'message-success',
                label: 'Success',
                text: msg.message,
                iconColor: '#0F7D37',
                icon: <Success color='#0F7D37' />,
            };
        } else if (msg.type === 'error') {
            data = {
                className: 'message-error',
                label: 'Error',
                text: msg.message,
                iconColor: '#FA0A11',
                icon: <ErrorIcon color='#FA0A11' />,
            };
        } else if (msg.type === 'logout_msg') {
            data = {
                className: 'message-success',
                label: '',
                text: msg.message,
                iconColor: '#0F7D37',
                icon: <Success color='#0F7D37' />,
            };
        }
        return (
            <div className='message' key={id}>
                <div className='message-content'>
                    {data.icon && <div className='msg-icon'>{data.icon}</div>}
                    <strong>{data.label}</strong>
                    <div className='msg-text'>
                        <span>{data.text}</span>
                    </div>
                </div>
                <div
                    role='presentation'
                    className='msg-close'
                    onClick={() => removeMessage(id)}
                >
                    <CloseIcon
                        style={{ fill: data.iconColor, width: 12, height: 12 }}
                    />
                </div>
            </div>
        );
    };
    return (
        <div id='simipify-top-message'>
            {Object.keys(messages).map((key) => renderMsg(messages[key], key))}
        </div>
    );
};
export default TopMessage;
