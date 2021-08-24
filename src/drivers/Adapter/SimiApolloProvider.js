import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';

window.DASHBOARD_URL = 'https://tapita.io/pb/';

const SimiApolloProvider = (props) => {
    const authLink = setContext((_, { headers }) => {
        const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
        return {
            headers: {
                ...headers,
                Cookie: '',
                'X-Shopify-Storefront-Access-Token': token,
            },
        };
    });

    const httpLink = createHttpLink({
        uri:
            process.env.SHOPIFY_BACKEND_URL +
            '/api/' +
            process.env.SHOPIFY_API_VERSION +
            '/graphql.json',
        useGETForQueries: false,
    });

    const client = new ApolloClient({
        cache: new InMemoryCache(),
        link: authLink.concat(httpLink),
    });

    return <ApolloProvider client={client}>{props.children}</ApolloProvider>;
};
export default SimiApolloProvider;
