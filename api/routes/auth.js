const router = require("express").Router()
const passport = require("passport")
const Account = require("./../db/Account")

router.post("/register", function(req, res, next) {
  console.log("registering user")
  Account.register(
    new Account({ username: req.body.username }),
    req.body.password,
    function(err) {
      if (err) {
        console.log("error while user register!", err)
        return next(err)
      }

      console.log("user registered!")

      res.redirect("/")
    }
  )
})

router.post("/login", passport.authenticate("local"), function(req, res) {
  res.redirect("/")
})

module.exports = router
