"use client"

import { ApolloClient, InMemoryCache, HttpLink, from, gql, } from "@apollo/client"
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

const link = from([
    errorLink,
    new HttpLink({ uri: "http://127.0.0.1:5555/graphql"}),
]);

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
});

export default client