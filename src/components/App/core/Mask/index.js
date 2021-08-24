import React from 'react';
import { useApp } from 'src/drivers/Context';

import './mask.scss';

const Mask = (props) => {
    const [appState, { toggleDrawer }] = useApp();
    return (
        <button
            className={`g-mask ${appState && appState.drawer ? 'active' : ''}`}
            onClick={() => toggleDrawer(false)}
        />
    );
};

export default Mask;
