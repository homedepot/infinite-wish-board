const mongoose = require("mongoose")

const mongoDB = process.env.mongoUrl || "mongodb://127.0.0.1/my_database"

mongoose.connect(mongoDB, { useNewUrlParser: true })

const db = mongoose.connection

db.on("error", console.error.bind(console, "MongoDB connection error:"))
