"use client"

import { ApolloClient, InMemoryCache, HttpLink, from, ApolloLink } from "@apollo/client"
import { onError } from "@apollo/client/link/error"


//Error Handling: This block defines an errorLink that catptures and logs any errors that occur during GraphQL operations

const errorLink = onError(({ graphQLErrors, networkError }) => {
    //graphQLErrors is an array that contains errors returned from the GraphQL server, such as schema validation issues or resolver errors. Each error object ontains:
    //message: A string describing the error, you can print this string on the frontend or log it to the console
    //locations: An array of locations in the GraphQL document where the error occurred.
    //path: The path to the field in the query that casused the error.
    if(graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) => {
            console.log(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
            )
        });
    }
    
    //network error: An error object representing issues with the network or server, such as timeouts or unreachable servers. Both the networkError and graphQLErrors log the errors to the console useful for debugging.
    if (networkError) {
        console.log(`[Network error]: ${networkError}`)
    }
});


//The authMiddleware is an ApolloLink that intercepts each request to attach the user's authentication token to the request headers.
const authMiddleware = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('token');

    //operation: This represents the GraphQL operation being executed e.g query or mutation
    //forward: A function that passes the operation to the next link in the chain.

    //Functionality: This function first receives the token from localStorage. If the token is found it sets the Authorization header with the token in the format Bearer <token>..
    //The operation is then forwarded to the next link, which will be the httpLink.
    if (token) {
        operation.setContext({
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
    return forward(operation);
});


//The HttpLink is responsible for sending the GraphQL requests to the specified server
//uri: The URI is where the GraphQL server is hosted. In our case it points to a GraphQL endpoint hosted via an ngrok tunnel
const httpLink = new HttpLink({ uri: "https://0f16-102-6-65-189.ngrok-free.app/graphql"});


//Combining Links(link):
//The link combines multiple Apollo Links into a single chain that processes the request in sequence.
//from: Combines the errorLink and authMiddleware into a single chain.
//authMiddleware.concat(httpLink): First applies the authentication middleware, then forwards the operation to the HTTP link for execution.
const link = from([
    errorLink,
    authMiddleware.concat(httpLink),
]);

//Finally, an instance of ApolloClient is created using the combined link and a new InMemoryCache.
//cache is a new instance of InMemoryCache that will be used to cache query results for performance improvements.
//link: The combined link chain handles authentication, error logging and sending requests.
const client = new ApolloClient({
    cache: new InMemoryCache(),
    link,
});

//This client instance is then exported to be used to make GraphQL queries and mutations
export default client