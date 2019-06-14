const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wishSchema = new Schema({
  child: {
    firstName: String,
    lastName: String,
    homeTown: String,
    illness: String,
    age: Number,
  },
  type: { type: String, enum: ['go', 'meet', 'be', 'see'] },
  details: String,
  sponsor: {
    name: String,
    logo: String,
    links: [String]
  }
})

module.exports = mongoose.model('wish', wishSchema)
