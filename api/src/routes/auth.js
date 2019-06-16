const router = require('express').Router()
const passport = require('passport')
const Account = require('../db/Account')

router.post('/register', function(req, res, next) {
  console.log('registering user')
  const { username, firstName, lastName, type } = req.body

  Account.register(
    new Account({ username, firstName, lastName, type}),
    req.body.password,
    function(err) {
      if (err) {
        return next(err)
      }

      res.sendStatus(200)
    }
  )
})

router.post('/login', passport.authenticate('local'), function(req, res) {
  const { firstName, lastName, username, type } = req.user

  res.json({ firstName, lastName, username, type })
})

router.get('/logout', function(req, res) {
  req.logout()
  res.sendStatus(200)
})

module.exports = router
