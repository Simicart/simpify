import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useReducer,
} from 'react';
import { gql, useLazyQuery } from '@apollo/client';

const UserContext = createContext();

/**
 * @typedef {Object} UserState
 *
 * @property {CurrentUser} currentUser Current user details
 * @property {Error} getDetailsError Get Details call related error
 * @property {Boolean} isGettingDetails Boolean if true indicates that user details are being fetched. False otherwise.
 * @property {Boolean} isResettingPassword Deprecated
 * @property {Boolean} isSignedIn Boolean if true indicates that the user is signed in. False otherwise.
 * @property {Error} resetPasswordError Deprecated
 */
const initialState = {
    currentUser: null,
    getDetailsError: null,
    isSignedIn: false,
};

function userReducer(state, action) {
    switch (action.type) {
        case 'set_current_user':
            return { ...state, ...{ currentUser: action.value } };
        default:
            return { ...state };
    }
}

const storage = window.localStorage;

export const UserContextProvider = (props) => {
    const { children } = props;

    const [userState, dispatchState] = useReducer(userReducer, initialState);

    const [
        fetchCustomerData,
        {
            data: customerData,
            loading: isGettingDetails,
            error: getDetailsError,
        },
    ] = useLazyQuery(GET_CUSTOMER, {
        fetchPolicy: 'no-cache',
    });

    const getToken = useCallback((tokenData) => {
        const token = storage.getItem('simpify_user_access_token');
        return token ? JSON.parse(token) : null;
    }, []);

    const clearToken = useCallback(() => {
        storage.removeItem('simpify_user_access_token');
    }, []);

    /**
     * @typedef {Object} tokenData
     *
     * @property {String} accessToken Access Token
     * @property {String} expiresAt Expired At
     *
     */
    const setToken = useCallback((tokenData) => {
        storage.setItem('simpify_user_access_token', JSON.stringify(tokenData));
    }, []);

    const signOut = useCallback(() => {
        clearToken();
        window.location.reload();
    }, []);

    const getUserDetails = useCallback(() => {
        const token = getToken();
        if (token && token.accessToken)
            fetchCustomerData({
                variables: {
                    customerAccessToken: token.accessToken,
                },
            });
    }, [getToken, fetchCustomerData]);

    useEffect(() => {
        if (customerData && customerData.customer) {
            dispatchState({
                type: 'set_current_user',
                value: customerData.customer,
            });
        } else {
            const token = getToken();
            if (token && getDetailsError) {
                signOut();
            } else if (!isGettingDetails) {
                getUserDetails();
            }
        }
    }, [customerData, signOut, getToken, isGettingDetails, getUserDetails]);

    const contextValue = [
        {
            ...userState,
            ...{
                isGettingDetails,
                getDetailsError,
                isSignedIn: !!(customerData && customerData.customer),
            },
        },
        {
            clearToken,
            getUserDetails,
            setToken,
            signOut,
        },
    ];

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

/**
 * @typedef {Object} UserState
 *
 * @property {CurrentUser} currentUser Current user details
 * @property {Error} getDetailsError Get Details call related error
 * @property {Boolean} isGettingDetails Boolean if true indicates that user details are being fetched. False otherwise.
 * @property {Boolean} isResettingPassword Deprecated
 * @property {Boolean} isSignedIn Boolean if true indicates that the user is signed in. False otherwise.
 * @property {Error} resetPasswordError Deprecated
 *
 */

/**
 * @typedef {Object} CurrentUser
 *
 * @property {String} email Current user's email
 * @property {String} firstName Current user's first name
 * @property {String} lastName Current user's last name
 */

/**
 * @typedef {Object} UserActions
 *
 * @property {Function} clearToken Callback to clear user token in browser persistence storage
 * @property {Function} getUserDetails Callback to get user details
 * @property {Function} setToken Callback to set user token in browser persistence storage
 * @property {Function} signOut Callback to sign the user out
 */

/**
 * @returns {[UserState, UserActions]}
 */
export const useUserContext = () => useContext(UserContext);

const GET_CUSTOMER = gql`
    query getCustomer($customerAccessToken: String!) {
        customer(customerAccessToken: $customerAccessToken) {
            email
            firstName
            lastName
            id
            displayName
            defaultAddress {
                id
                address1
                address2
                city
                company
                country
                countryCodeV2
                firstName
                lastName
                name
                phone
                province
                provinceCode
                zip
            }
            acceptsMarketing
            phone
            tags
            createdAt
            updatedAt
        }
    }
`;
