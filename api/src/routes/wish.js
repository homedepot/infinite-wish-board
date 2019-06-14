const wishRouter = require('express').Router()
const Wish = require('../db/Wish')

wishRouter.route('/').get((req, res) => {
  Wish.find({}, (err, Wishes) => {
    res.json(Wishs)
  })
})

wishRouter.route('/:wishId').get((req, res) => {
  Wish.findById(req.params.wishId, (err, Wish) => {
    res.json(Wish)
  })
})

module.exports = wishRouter;