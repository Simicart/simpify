import React from 'react';
import { defaultStyle } from './Consts';

const RadioChecked = (props) => {
    const color = props.color ? { fill: props.color } : {};
    const style = { ...defaultStyle, ...props.style, ...color };

    return (
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='48'
            height='48'
            viewBox='0 0 48 48'
            style={style}
            className={props.className}
        >
            <path d='M24 14c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0-10C12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20S35.05 4 24 4zm0 36c-8.84 0-16-7.16-16-16S15.16 8 24 8s16 7.16 16 16-7.16 16-16 16z' />
            <path d='M0 0h48v48H0z' fill='none' />
        </svg>
    );
};

export default RadioChecked;
