import React from 'react';

import { WindowSizeContextProvider } from './WindowSizeContextProvider';
import { AppContextProvider } from './AppContextProvider';
import { TopMessageContextProvider } from './TopMessageContextProvider';
import { ConfigContextProvider } from './ConfigContextProvider';
import { UserContextProvider } from './UserContextProvider';
export { useWindowSize } from './WindowSizeContextProvider';
export { useApp } from './AppContextProvider';
export { useTopMessage } from './TopMessageContextProvider';
export { useConfig } from './ConfigContextProvider';
export { useUserContext } from './UserContextProvider';

const contextProviders = [
    WindowSizeContextProvider,
    AppContextProvider,
    TopMessageContextProvider,
    ConfigContextProvider,
    UserContextProvider,
];

const ContextProvider = ({ children }) => {
    return contextProviders.reduceRight((memo, SubContextProvider) => {
        return <SubContextProvider>{memo}</SubContextProvider>;
    }, children);
};

export default ContextProvider;
