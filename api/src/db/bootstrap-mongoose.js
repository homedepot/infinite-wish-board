const mongoose = require('mongoose')

const mongoDB = process.env.mongoUrl || 'mongodb://localhost:27017/my_database'

mongoose.connect(mongoDB, { useNewUrlParser: true })

const db = mongoose.connection

db.on('error', console.error.bind(console, 'MongoDB connection error:'))
