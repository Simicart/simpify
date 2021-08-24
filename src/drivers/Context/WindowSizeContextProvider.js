import React, {
    createContext,
    useEffect,
    useCallback,
    useContext,
    useState,
} from 'react';

export const useEventListener = (target, type, listener, ...rest) => {
    useEffect(() => {
        if (!target || typeof target.addEventListener !== 'function') {
            return;
        }
        target.addEventListener(type, listener, ...rest);
        return () => {
            target.removeEventListener(type, listener, ...rest);
        };
    }, [listener, rest, target, type]);
};

const WindowSizeContext = createContext();

const getSize = () => {
    // 1080x1920 is a common iPhone resolution
    return {
        innerHeight: globalThis.innerHeight || 1920,
        innerWidth: globalThis.innerWidth || 1080,
        outerHeight: globalThis.outerHeight || 1920,
        outerWidth: globalThis.outerWidth || 1080,
    };
};

const useWindowSizeListener = () => {
    const [windowSize, setWindowSize] = useState(getSize());
    const element = globalThis.document ? window : null;

    const handleResize = useCallback(() => {
        setWindowSize(getSize());
    }, [setWindowSize]);

    useEventListener(element, 'resize', handleResize);

    return windowSize;
};

export const WindowSizeContextProvider = (props) => {
    const windowSize = useWindowSizeListener();

    return (
        <WindowSizeContext.Provider value={windowSize}>
            {props.children}
        </WindowSizeContext.Provider>
    );
};

export const useWindowSize = () => useContext(WindowSizeContext);
