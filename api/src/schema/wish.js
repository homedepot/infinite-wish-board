const { gql } = require('apollo-server-express')

module.exports = gql`
  extend type Query {
    wishes: [Wish!]!
    wish(id: ID!): Wish!
  }

  extend type Mutation {
    createWish(child: ChildInput!, type: Type!, details: String!): Wish!
  }

  type Wish {
    id: ID!
    details: String!
    child: Child!
    sponsor: Sponsor
    type: Type!
  }

  type Child {
    id: ID!
    name: String!
    hometown: String!
    illness: String!
    age: Int!
  }

  input ChildInput {
    name: String!
    hometown: String!
    illness: String!
    age: Int!
  }

  type Sponsor {
    name: String!
    logo: String!
    links: [String]
  }

  enum Type {
    GO
    MEET
    BE
    SEE
  }
`;