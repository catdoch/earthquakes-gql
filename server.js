const express = require("express");
const { graphqlExpress, graphiqlExpress } = require("apollo-server-express");
const bodyParser = require("body-parser");
const { ApolloEngine } = require("apollo-engine");
const cors = require("cors");

const { schema } = require("./schema");

const app = express();

if (!process.env.ENGINE_API_KEY) {
  throw new Error(
    "Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY."
  );
}

app.use('*', cors({ origin: 'https://w51p0rml4z.lp.gql.zone/graphql' }));

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: schema,
  tracing: true
}));

app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));

const PORT = process.env.PORT || 4000;

const engine = new ApolloEngine({
  apiKey: process.env.ENGINE_API_KEY,
  stores: [
    {
      name: "publicResponseCache",
      inMemory: {
        cacheSize: 10485760
      }
    }
  ],
  queryCache: {
    publicFullQueryStore: "publicResponseCache"
  }
});

// Start the app
engine.listen(
  {
    port: PORT,
    expressApp: app
  },
  () => {
    console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
  }
);