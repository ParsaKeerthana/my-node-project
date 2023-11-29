const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

// Sample data
const users = [{ id: "1", name: "John Doe", email: "john@example.com" }];

// GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    email: String
  }
  type Query {
    user(id: ID!): User
  }
`;

// Resolvers
const resolvers = {
  Query: {
    user: (_, { id }) => users.find(user => user.id === id),
  },
};

// Initialize Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

// Start function
async function startServer() {
  await server.start();
  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
}

startServer();
