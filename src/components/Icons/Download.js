import React from 'react';
import { defaultStyle } from './Consts';

const Icon = (props) => {
    const color = props.color ? { fill: props.color } : {};
    const style = { ...defaultStyle, ...props.style, ...color };

    return (
        <svg
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
            x='0px'
            y='0px'
            className={props.className}
            viewBox='0 0 480 480'
            style={style}
        >
            <g>
                <g>
                    <path
                        d='M378.528,214.688l-21.088-24c-5.824-6.624-15.904-7.264-22.56-1.472L272,244.32V16c0-8.832-7.168-16-16-16h-32
        c-8.832,0-16,7.168-16,16v228.32l-62.88-55.104c-6.624-5.792-16.704-5.152-22.56,1.472l-21.088,23.968
        c-5.856,6.656-5.184,16.8,1.472,22.624l126.528,110.752c6.048,5.28,15.04,5.28,21.088,0L377.056,237.28
        C383.712,231.456,384.384,221.312,378.528,214.688z'
                    />
                </g>
            </g>
            <g>
                <g>
                    <path
                        d='M416,416H64c-8.832,0-16,7.168-16,16v32c0,8.832,7.168,16,16,16h352c8.832,0,16-7.168,16-16v-32
        C432,423.168,424.832,416,416,416z'
                    />
                </g>
            </g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
            <g></g>
        </svg>
    );
};
export default Icon;
