const mongoose = require('mongoose')

const Schema = mongoose.Schema

const wishSchema = new Schema({
  child: {
    name: String,
    hometown: String,
    illness: String,
    age: Number,
  },
  type: { type: String, enum: ['go', 'meet', 'be', 'see'] },
  details: String,
  sponsor: {
    name: String,
    logo: String,
    links: [String]
  },
},
{
  timestamps: true
},
)

module.exports = mongoose.model('wish', wishSchema)
