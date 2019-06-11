const express = require('express')
const logger = require('morgan')
const debug = require('debug')('app')
const cookieParser = require('cookie-parser')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const compression = require('compression')
const errorHandler = require('api-error-handler')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const index = require('./routes')
const auth = require('./routes/auth')
const cors = require('cors')

const app = express()

app.use(compression())

app.use(
  cors({
    origin: process.env.corsDomain || 'http://localhost:3001',
    credentials: true
  })
)
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(session({ keys: [process.env.cookieSigningKey || 'secretkey1'] }))

app.use(passport.initialize())
app.use(passport.session())

const Account = require('./db/Account')

passport.use(new LocalStrategy(Account.authenticate()))

passport.serializeUser(Account.serializeUser())
passport.deserializeUser(Account.deserializeUser())

require('./db/bootstrap-mongoose')

app.use('/', index)
app.use('/auth', auth)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(errorHandler())

app.set('port', process.env.PORT || 3002)
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port)
})
