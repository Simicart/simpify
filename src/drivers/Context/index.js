import React from 'react';

import { WindowSizeContextProvider } from './WindowSizeContextProvider';
import { AppContextProvider } from './AppContextProvider';
import { TopMessageContextProvider } from './TopMessageContextProvider';
import { ConfigContextProvider } from './ConfigContextProvider';
export { useWindowSize } from './WindowSizeContextProvider';
export { useApp } from './AppContextProvider';
export { useTopMessage } from './TopMessageContextProvider';
export { useConfig } from './ConfigContextProvider';

const contextProviders = [
    WindowSizeContextProvider,
    AppContextProvider,
    TopMessageContextProvider,
    ConfigContextProvider,
];

const ContextProvider = ({ children }) => {
    return contextProviders.reduceRight((memo, SubContextProvider) => {
        return <SubContextProvider>{memo}</SubContextProvider>;
    }, children);
};

export default ContextProvider;
