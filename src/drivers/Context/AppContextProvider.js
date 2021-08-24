import React, {
    useContext,
    createContext,
    useCallback,
    useReducer,
    useEffect,
} from 'react';

const AppContext = createContext();
/**
 * drawer: {String} - nav|filter|cart|false(bool)
 */
const initialState = { isOnline: true, isPageLoading: false, drawer: false };

function appReducer(state, action) {
    switch (action.type) {
        case 'toggle_drawer':
            return { ...state, ...{ drawer: action.value } };
        case 'set_loading':
            return { ...state, ...{ isPageLoading: action.value } };
        case 'set_online':
            return { ...state, ...{ isOnline: action.value } };
        default:
            throw new Error();
    }
}

export const AppContextProvider = (props) => {
    const [appState, dispatchState] = useReducer(appReducer, initialState);

    const toggleDrawer = useCallback(
        (value) => {
            dispatchState({ type: 'toggle_drawer', value });
        },
        [dispatchState],
    );

    const setOnline = useCallback(() => {
        dispatchState({ type: 'set_online', value: true });
    }, [dispatchState]);

    const setOffline = useCallback(() => {
        dispatchState({ type: 'set_online', value: false });
    }, [dispatchState]);

    const setLoading = useCallback(
        (value) => {
            dispatchState({ type: 'set_loading', value });
        },
        [dispatchState],
    );

    const contextValue = [
        appState,
        { setOnline, setOffline, toggleDrawer, setLoading },
    ];

    useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);
    }, []);

    return (
        <AppContext.Provider value={contextValue}>
            {props.children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
