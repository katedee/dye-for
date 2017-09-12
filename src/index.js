import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import { ApolloProvider, createNetworkInterface, ApolloClient } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';


const networkInterface = createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/cj70tva881t4c0197qhlept5q' });

const client = new ApolloClient({ networkInterface });

ReactDOM.render(
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </BrowserRouter>
    , document.getElementById('root')
);
registerServiceWorker();
