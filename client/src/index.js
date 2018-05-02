import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";
import gql from "graphql-tag";

import './index.css';
import App from './App';

const client = new ApolloClient({
  uri: 'https://w51p0rml4z.lp.gql.zone/graphql'
});

const GET_QUAKE = gql`
  query {
    getQuakes {
      mag
      place
      coords
      time
    }
  }
`;

const Quakes = () => (
  <div>
    <Query query={GET_QUAKE}>
      {({ loading, error, data }) => {
        if (loading) return <h3>Loading...</h3>;
        if (error) return `Error! ${error.message}`;
        return (
          <App data={data} />
        )
      }}
    </Query>
  </div>
);

ReactDOM.render(
    <ApolloProvider client={client}>
        <div>
            <div id="map" />
            <Quakes />
        </div>
    </ApolloProvider>,
  document.getElementById('root')
);
