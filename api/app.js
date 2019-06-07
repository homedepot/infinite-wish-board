const express = require("express")
const logger = require("morgan")
const debug = require("debug")("app")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const compression = require("compression")

const index = require("./routes/index")
const users = require("./routes/users")

const app = express()

app.use(compression())
app.use(logger("dev"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
require("./db/bootstrap-mongoose")

app.use("/", index)
app.use("/users", users)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found")
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

app.set("port", process.env.PORT || 3002)
var server = app.listen(app.get("port"), function() {
  debug("Express server listening on port " + server.address().port)
})
