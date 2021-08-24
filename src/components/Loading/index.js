import React from 'react';
import { getRandomString } from '../../util/getRandomString';

const Loading = (props) => {
    const style = props.style ? props.style : {};
    return (
        <div
            id={props.id ? props.id : getRandomString(5)}
            className={`loading-spiner ${
                props.className ? props.className : ''
            }`}
            style={props.divStyle ? props.divStyle : {}}
        >
            <img
                style={style}
                className='loading-svg-image'
                src='/icons/loading_ic.svg'
                alt='loading'
            />
        </div>
    );
};

export default Loading;
