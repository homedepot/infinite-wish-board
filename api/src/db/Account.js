const mongoose = require('mongoose')

const Schema = mongoose.Schema

const passportLocalMongoose = require('passport-local-mongoose')

const Account = new Schema({
  firstName: String,
  lastName: String,
  type: { type: String, enum: ['admin', 'sponsor', 'basic'] }
})

Account.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', Account)
