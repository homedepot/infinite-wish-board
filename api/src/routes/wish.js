const wishRouter = require('express').Router()
const Wish = require('../db/Wish')

wishRouter.route('/')
  .get((req, res) => {
    Wish.find({}, (err, wishes) => {
      res.send(wishes)
    })
  })
  .post((req, res) => {
    let wish = new Wish(req.body)
    wish.save()
    res.status(201).send(wish) 
  })

wishRouter.route('/:id')
  .get((req, res) => {
    Wish.findById(req.params.id, (err, wish) => {
      res.send(wish)
    })
  })
  .delete((req, res) => {
    Wish.findById(req.params.id, (err, wish) => {
      console.log('wish :', wish);
      wish.remove()
      res.status(204).end()
    })
  })

module.exports = wishRouter