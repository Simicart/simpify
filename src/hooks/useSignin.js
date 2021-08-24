import React, { useCallback, useRef, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
export const useSignin = (props) => {
    const signinQuery =
        props && props.signinQuery ? props.signinQuery : SIGN_IN;
    const formApiRef = useRef(null);
    const [isSignin, setIsSigningIn] = useState(false);

    const [signIn, { error: signInError }] = useMutation(signinQuery, {
        fetchPolicy: 'no-cache',
    });

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
        setFormApi,
        handleSubmit,
        isSignin,
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
