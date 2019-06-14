const wishRouter = require('express').Router()
const Wish = require('../db/Wish')

wishRouter.today = () => {
  return new Date()
}

wishRouter.getDefaultDateRange = (date) => {
  const year = (() => {
    if (date.getMonth() === 0) {
      return date.getFullYear() - 1
    } else {
      return date.getFullYear()
    }
  })();

  return [
    `${year}-01-01T00:00:00Z`,
    `${year}-12-31T23:59:59Z`,
  ]
}

wishRouter.route('/')
  .get(async (req, res) => {
    const beginDate = req.query.beginDate;
    const endDate = req.query.endDate;

    query = [];
    if (beginDate) {
      query.push({ updatedAt: { '$gt': beginDate } })      
    }
    if (endDate) {
      query.push({ updatedAt: { '$lte': endDate } })      
    }

    if (query.length <= 0) {
      const dateRange = wishRouter.getDefaultDateRange(wishRouter.today())
      query.push({ updatedAt: { '$gt': dateRange[0] } })
      query.push({ updatedAt: { '$lte': dateRange[1] } })
    }

    res.send(await Wish.find({
      '$and': query
    }))
  })
  .post((req, res) => {
    let wish = new Wish(req.body)
    wish.save()
    res.status(201).send(wish) 
  })

wishRouter.route('/:id').get((req, res) => {
  Wish.findById(req.params.id, (err, Wish) => {
    res.send(Wish)
  })
})

wishRouter.route('/')
    .post((req, res) => {
        let wish = new Wish({});
        wish.save();
        res.status(201).send(wish) 
    })

module.exports = wishRouter;