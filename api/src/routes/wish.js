const wishRouter = require('express').Router()
const Wish = require('../db/Wish')

wishRouter.route('/')
  .get((req, res) => {
    Wish.find({}, (err, wishes) => {
      return res.send(wishes)
    })
  })
  .post((req, res) => {
    let wish = new Wish(req.body)
    wish.save()
    return res.status(201).send(wish) 
  })

wishRouter.route('/:id')
  .get((req, res) => {
    Wish.findById(req.params.id, (err, wish) => {
      return res.send(wish)
    })
  })
  .put((req, res) => {
    Wish.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, wish) => {
      if (err) return res.status(500).send(err);
      return res.status(200).send(wish);
    })
  })
  .delete((req, res) => {
    Wish.findByIdAndRemove(req.params.id, (err, wish) => {
      if (err) return res.status(500).send(err)
      const response = {
        message: "Wish successfully deleted",
        id: wish._id
      }
      return res.status(200).send(response)
    })
  })

module.exports = wishRouter