const { gql } = require('apollo-server-express');

    const typeDefs = gql`
    type Character {
    id: ID!
    name: String
    status: String
    species: String
    gender: String
    origin: Origin
    }

    type Origin {
        name: String
    }

    type Query {
    characters(
    name: String
    status: String
    species: String
    gender: String
    origin: String
    ): [Character]
    }
    `;

    module.exports = typeDefs;