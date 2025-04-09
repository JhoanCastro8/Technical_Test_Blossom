    const express = require('express');
    const { ApolloServer } = require('apollo-server-express');
    const typeDefs = require('./schema');
    const resolvers = require('./resolvers');
    const loggerMiddleware = require('./middlewares/loggerMiddleware');

    const app = express();
    app.use(loggerMiddleware);

    const server = new ApolloServer({
    typeDefs,
    resolvers,
    });

    async function startServer() {
    await server.start();
    server.applyMiddleware({ app });
    }
    startServer();

    app.listen({ port: 4000 }, () =>
    console.log(` Server ready at http://localhost:4000${server.graphqlPath}`)
    );