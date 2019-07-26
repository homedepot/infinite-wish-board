const schema = require('./resolvers')

module.exports = app => {
  schema.applyMiddleware({app})
}