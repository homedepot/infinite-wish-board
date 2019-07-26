const { ApolloServer } = require('apollo-server-express')
const accounts = require('./accounts');
// const data = require('./data');

const { makeExecutableSchema, mergeSchemas } = require('graphql-tools');

const schema = mergeSchemas({
  schemas: [
    makeExecutableSchema(accounts),
  ]
})

const SERVER = new ApolloServer({
  schema,
  playground: {
    endpoint: 'http://localhost:3002/graphql',
    settings: {
      'editor.theme': 'dark'
    }                                                                                                                                 
  }
})

module.exports = SERVER
