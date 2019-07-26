const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    #Get the accounts in the company, must be an admin
    accounts: [Account] 
  }

  type Account {
    id: Int!
    firstName: String!
    lastName: String!
  }
`

const resolvers = {
  Query: {
    accounts: require('./queries/accounts'),
  },
}

module.exports = { typeDefs, resolvers }