const wishRouter = require('express').Router()
const Wish = require('../db/Wish')

wishRouter.route('/').get((req, res) => {
  Wish.find({}, (err, Wishes) => {
    res.send(Wishes)
  })
})

wishRouter.route('/:wishId').get((req, res) => {
  Wish.findById(req.params.wishId, (err, Wish) => {
    res.send(Wish)
  })
})

module.exports = wishRouter;