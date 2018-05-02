const { makeExecutableSchema } = require("graphql-tools");

const fetch = require("node-fetch");

const getDateParams = () => {
  const pad = (n) => ( n < 10 ? '0' + n : n );
  const dateObj = new Date();
  const year = dateObj.getUTCFullYear();
  const month = dateObj.getUTCMonth();
  const day = dateObj.getUTCDate();

  return `starttime=${year}-${pad(month)}-${pad(day)}`
}

// Construct a schema, using GraphQL schema language
const typeDefs = `
  type Query {
    getQuakes: [Features]
  }
  type Features @cacheControl(maxAge: 60) {
	title: String
    mag: Float
    place: String,
    coords: [String],
    time: Float
  }
`;

const resolvers = {
  Query: {
	  getQuakes: (root, args, context) => {
		  return fetch(
        `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&${getDateParams()}&minmagnitude=3`
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

// Required: Export the GraphQL.js schema object as "schema"
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

module.exports = { schema };
