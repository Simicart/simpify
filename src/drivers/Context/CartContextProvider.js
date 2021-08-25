import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { gql, useLazyQuery, useMutation } from '@apollo/client';
import { CheckoutFragment } from 'src/hooks/Cart/CartPageFragment.gql';

const storage = window.localStorage;

const CartContext = createContext();

export const CartContextProvider = (props) => {
    const [fetchCartId, { data: createCartData }] =
        useMutation(CREATE_CART_MUTATION);
    const [
        fetchCartDetails,
        { data: cartData, loading: isGettingCart, error: getCartError },
    ] = useLazyQuery(CART_DETAILS_QUERY);

    const getCartId = useCallback(() => {
        return storage.getItem('simpify_cart_id');
    }, []);

    const setCartId = useCallback((cartId) => {
        return storage.setItem('simpify_cart_id', cartId);
    }, []);

    const getCartDetails = useCallback(() => {
        if (createCartData) {
            if (
                createCartData.checkoutCreate &&
                createCartData.checkoutCreate.checkout &&
                createCartData.checkoutCreate.checkout.id
            ) {
                setCartId(createCartData.checkoutCreate.checkout.id);
            }
        } else {
            const cartId = getCartId();
            if (!cartId) {
                fetchCartId({ variables: { input: {} } });
            } else {
                fetchCartDetails({ variables: { id: cartId } });
            }
        }
    }, [fetchCartDetails, fetchCartId, createCartData]);

    let contextCartData = null;
    if (
        createCartData &&
        createCartData.checkoutCreate &&
        createCartData.checkoutCreate.checkout
    ) {
        contextCartData = createCartData.checkoutCreate.checkout;
    } else if (cartData && cartData.node) {
        contextCartData = cartData.node;
    }

    const contextValue = useMemo(
        () => [
            { cart: contextCartData },
            { getCartDetails, getCartId, setCartId },
        ],
        [contextCartData, getCartDetails, getCartId, setCartId],
    );
    return (
        <CartContext.Provider value={contextValue}>
            {props.children}
        </CartContext.Provider>
    );
};

export const useCartContext = () => useContext(CartContext);

const CREATE_CART_MUTATION = gql`
    mutation checkoutCreate($input: CheckoutCreateInput!) {
        checkoutCreate(input: $input) {
            checkout {
                __typename
                ...CheckoutFragment
            }
            checkoutUserErrors {
                code
                field
                message
            }
            queueToken
        }
    }
    ${CheckoutFragment}
`;

const CART_DETAILS_QUERY = gql`
    query ($id: ID!) {
        node(id: $id) {
            __typename
            ...CheckoutFragment
        }
    }
    ${CheckoutFragment}
`;
