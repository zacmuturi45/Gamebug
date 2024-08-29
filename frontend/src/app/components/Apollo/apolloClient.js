"use client"

import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink, concat } from "@apollo/client"
import { onError } from "@apollo/client/link/error"

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if(graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        });
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
});

const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');

    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    return forward(operation);
});

const httpLink = new HttpLink({ uri: "https://783c-102-217-64-54.ngrok-free.app/graphql"});

const link = from([
    errorLink,
    authMiddleware.concat(httpLink),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

export default client