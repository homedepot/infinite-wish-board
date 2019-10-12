const mongoose = require('mongoose')
const regex = /[{}+=_0-9\-\\|\[\])(*&^%%$#@!~`<>,?'";:]/;

const Schema = mongoose.Schema

const wishSchema = new Schema(
  {
    child: {
      name: { type: String, validate: [
        function(name){
          return (!regex.test(name));
        }, 'Name must contain only letters of the alphabet'
      ]},
      hometown: String,
      illness: String,
      age: Number
    },
    type: { type: String, enum: ['go', 'meet', 'be', 'have'] },
    details: String,
    sponsor: {
      name: { type: String, validate: [
        function(name){
          return (!regex.test(name));
        }, 'Name must contain only letters of the alphabet'
      ]},
      logo: String,
      links: [String]
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('wish', wishSchema)
