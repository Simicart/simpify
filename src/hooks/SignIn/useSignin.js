import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useUserContext } from 'src/drivers/Context';
import { useMutation, gql } from '@apollo/client';
export const useSignin = (props) => {
    const [userState, { getUserDetails, setToken }] = useUserContext();

    const signinQuery =
        props && props.signinQuery ? props.signinQuery : SIGN_IN;
    const formApiRef = useRef(null);
    const [isSigningIn, setIsSigningIn] = useState(false);

    const [signIn, { error: signInError, data: signInData }] = useMutation(
        signinQuery,
        {
            fetchPolicy: 'no-cache',
            onError: () => {
                setIsSigningIn(false);
            },
        },
    );
    useEffect(() => {
        if (signInData) {
            if (isSigningIn) {
                setIsSigningIn(false);
            }
            if (
                signInData.customerAccessTokenCreate &&
                signInData.customerAccessTokenCreate.customerAccessToken
            ) {
                setToken(
                    signInData.customerAccessTokenCreate.customerAccessToken,
                );
                getUserDetails();
            }
        }
    }, [signInData, isSigningIn, setIsSigningIn, setToken]);

    const handleSubmit = useCallback(
        (dataSubmit) => {
            setIsSigningIn(true);
            const { email, password } = dataSubmit;
            signIn({
                variables: { input: { email, password } },
            });
        },
        [signIn, setIsSigningIn],
    );

    const setFormApi = useCallback((api) => (formApiRef.current = api), []);

    return {
        userState,
        setFormApi,
        handleSubmit,
        isSigningIn,
        signInError,
    };
};

export const SIGN_IN = gql`
    mutation customerAccessTokenCreate(
        $input: CustomerAccessTokenCreateInput!
    ) {
        customerAccessTokenCreate(input: $input) {
            customerAccessToken {
                accessToken
                expiresAt
            }
            customerUserErrors {
                code
                field
                message
            }
        }
    }
`;
