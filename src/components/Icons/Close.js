import React from 'react';
import { defaultStyle } from './Consts';

const Close = (props) => {
    const color = props.color ? { fill: props.color } : {};
    const style = { ...defaultStyle, ...props.style, ...color };

    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            style={style}
            x='0px'
            y='0px'
            className={props.className}
            viewBox='0 0 186.8 184.8'
        >
            <path
                d='M182.6,4.4c-4.5-4.5-11.7-4.5-16.1,0l-73,72.9l-73-72.9C16-0.1,8.8-0.1,4.4,4.4c-4.5,4.5-4.5,11.7,0,16.1l73,72.9l-73,72.9
					c-4.5,4.5-4.5,11.7,0,16.1c4.5,4.5,11.7,4.5,16.1,0l73-72.9l73,72.9c4.5,4.5,11.7,4.5,16.1,0c4.5-4.5,4.5-11.7,0-16.1l-72.9-72.9
					l72.9-72.9C187.1,16.1,187.1,8.9,182.6,4.4z'
            />
        </svg>
    );
};

export default Close;
