const wishRouter = require('express').Router()
const Wish = require('../db/Wish')

wishRouter.route('/').get((req, res) => {
  Wish.find({}, (err, wishes) => {
    res.send(wishes)
  })
})

wishRouter.route('/:wishId').get((req, res) => {
  Wish.findById(req.params.wishId, (err, Wish) => {
    res.send(Wish)
  })
})

module.exports = wishRouter;