import React from 'react';
import SimiApolloProvider from './SimiApolloProvider';
import { BrowserRouter } from 'react-router-dom';
import ContextProvider from '../Context';
import App from '../../components/App';

const Adapter = (props) => {
    const children = props.children || <App />;

    return (
        <SimiApolloProvider>
            <BrowserRouter>
                <ContextProvider>{children}</ContextProvider>
            </BrowserRouter>
        </SimiApolloProvider>
    );
};

export default Adapter;
