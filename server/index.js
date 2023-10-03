import { ApolloServer } from '@apollo/server';
import { typeDefs } from './Schema.js';
import client from './db.js';
import { startStandaloneServer } from '@apollo/server/standalone'
import { resolvers } from './resolvers.js';


//connect to to the database

await client.connect();

//connect to appolo server
const server = new ApolloServer({
  typeDefs,
  resolvers
})

//start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: Number(process.env.PORT) || 4000 }
})

//debuging the server
console.log(`Server ready at: ${url}`)

