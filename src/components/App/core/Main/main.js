import React from 'react';
import { useConfig } from 'src/drivers/Context';
import Navigation from '../Navigation';
import Routes from '../Routes';
import ToastMessage from '../Message/ToastMessage';
import TopMessage from '../Message/TopMessage';
import GlobalLoading from '../GlobalLoading';
import Mask from '../Mask';

let hiddenSplash = false;

const App = (props) => {
    const configData = useConfig();
    
    if (configData) {
        if (!hiddenSplash) {
            try {
                const splashScreen = document.getElementById('splash-screen');
                if (splashScreen) splashScreen.style.display = 'none';
                hiddenSplash = true;
            } catch (err) {
                console.warn('no splash screen found');
            }
        }
    } else {
        return '';
    }

    return (
        <React.Fragment>
            <Navigation />
            <div id='id-message'>
                <TopMessage />
                <ToastMessage />
                <GlobalLoading />
            </div>
            <Routes />
            <Mask />
        </React.Fragment>
    );
};

App.propTypes = {};
App.defaultProps = {};
export default App;
