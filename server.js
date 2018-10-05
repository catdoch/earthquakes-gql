const express = require("express");
const path = require('path');
require('dotenv').config();
// const cors = require("cors");

const { server } = require("./schema");

const app = express();

if (!process.env.ENGINE_API_KEY) {
  throw new Error(
    "Please provide an API key for Apollo Engine in the environment variable ENGINE_API_KEY."
  );
}

// app.use('*', cors({ origin: 'https://w51p0rml4z.lp.gql.zone/graphql' }));

server.applyMiddleware({app});

// app.use('/graphql', bodyParser.json(), graphqlExpress({
//   schema: schema,
//   tracing: true
// }));

// app.use('/graphiql', graphiqlExpress({
//   endpointURL: '/graphql'
// }));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`The server has started on port: ${PORT}`);
  console.log(`http://localhost:${PORT}/graphql`);
});

// app.use(express.static('/client/build'));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/client/public/index.html');
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '/client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '/client/public/', 'index.html'));
  });
}

// const engine = new ApolloEngine({
//   apiKey: process.env.ENGINE_API_KEY,
//   stores: [
//     {
//       name: "publicResponseCache",
//       inMemory: {
//         cacheSize: 10485760
//       }
//     }
//   ],
//   queryCache: {
//     publicFullQueryStore: "publicResponseCache"
//   }
// });

// Start the app
// engine.listen(
//   {
//     port: PORT,
//     expressApp: app
//   },
//   () => {
//     console.log(`Go to http://localhost:${PORT}/graphiql to run queries!`);
//   }
// );