import React from 'react';
import './index.css';
import App from './components/App';
import { BrowserRouter } from 'react-router-dom'
import { ApolloClient, InMemoryCache } from 'apollo-client-preset';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';


const httpLink = createHttpLink({
    uri: 'https://api.graph.cool/simple/v1/cjbxw7ife3lx40127famxbu0s',
});

const authLink = setContext(async (req, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('graphcoolToken');
    return {
        ...headers,
        headers: {
            authorization: token ? `Bearer ${token}` : null,
        },
    };
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

render(
    <BrowserRouter>
    <ApolloProvider client={client}>
            <App />
            </ApolloProvider>
        </BrowserRouter>
    , document.getElementById('root')
);
// registerServiceWorker();