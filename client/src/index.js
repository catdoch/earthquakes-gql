import React from 'react';
import ReactDOM from 'react-dom';
import { getDateParams } from '../utils/getDate';

import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import Quakes from './quakes';
import './index.css';


const cache = new InMemoryCache();
const client = new ApolloClient({
    cache,
    uri: 'https://earthquake-gql.herokuapp.com/graphql'
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <div>
            <h1>{`Earthquakes as of ${getDateParams()} (BST)`}</h1>
            <Quakes />
        </div>
    </ApolloProvider>,
    document.getElementById('root')
);
