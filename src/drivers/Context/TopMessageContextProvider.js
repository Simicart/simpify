import React, { createContext, useCallback, useContext, useState } from 'react';

const TopMessageContext = createContext();

export const TopMessageContextProvider = (props) => {
    const [messages, setMessages] = useState({});

    const cleanMessages = useCallback(() => {
        setMessages({});
    }, [setMessages]);

    /**
     * @param msgData.type {String} error/warning/success/logout_msg
     * @param msgData.message {String||Object}
     * @param msgData.auto_dismiss {Boolean}
     * @param id {String} - To override the old message, just send the same id
     * type: 'error', message: 'An error occurred while making the transaction. Please try again.' , auto_dismiss: false }
     */
    const toggleMessage = useCallback(
        (msgData, id) => {
            const newMessages = JSON.parse(JSON.stringify(messages));
            newMessages[id] = msgData;
            setMessages(newMessages);
        },
        [setMessages, messages],
    );

    /**
     * @param id {String} - To override the old message, just send the same id
     * Remove Message with Id
     */
    const removeMessage = useCallback(
        (id) => {
            const newMessages = JSON.parse(JSON.stringify(messages));
            delete newMessages[id];
            setMessages(newMessages);
        },
        [setMessages, messages],
    );

    return (
        <TopMessageContext.Provider
            value={[messages, { cleanMessages, toggleMessage, removeMessage }]}
        >
            {props.children}
        </TopMessageContext.Provider>
    );
};

export const useTopMessage = () => useContext(TopMessageContext);
