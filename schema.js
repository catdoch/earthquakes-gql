const { ApolloServer, gql } = require('apollo-server-express');
const fetch = require('node-fetch');
const { getDateParams } = require('./client/src/utils/getDate');

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
    type Query {
        getQuakes(mag: Int!): [Features]
    }
    type Features @cacheControl(maxAge: 60) {
        title: String
        mag: Float
        place: String
        coords: [String]
        time: Float
    }
`;

const resolvers = {
    Query: {
        getQuakes(root, args, context) {
            return fetch(
                `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${getDateParams()}&minmagnitude=${args.mag}`
            )
                .then(res => res.json())
                .then(data => data.features.map(feats => feats));
        }
    },
    Features: {
        title: event => event.properties.title,
        mag: event => event.properties.mag,
        place: event => event.properties.place,
        coords: event => event.geometry.coordinates,
        time: event => event.properties.time
    }
};

// GraphQL: Schema
const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
        endpoint: `http://localhost:4000/graphql`
    }
});

module.exports = { server };
