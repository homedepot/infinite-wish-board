const wishRouter = require('express').Router()
const Wish = require('../db/Wish')

wishRouter.MEET = 'meet'
wishRouter.GO = 'go'
wishRouter.HAVE = 'have'
wishRouter.BE = 'be'

wishRouter.today = () => {
  return new Date()
}

wishRouter.getDefaultDateRange = date => {
  const year = (() => {
    if (date.getMonth() === 0) {
      return date.getFullYear() - 1
    } else {
      return date.getFullYear()
    }
  })()

  return [`${year}-01-01T00:00:00Z`, `${year}-12-31T23:59:59Z`]
}

wishRouter
  .route('/')
  .get(async (req, res) => {
    const beginDate = req.query.beginDate
    const endDate = req.query.endDate
    const types = req.query.types
    const sort = req.query.sort

    query = []
    if (beginDate) {
      query.push({ updatedAt: { $gt: beginDate } })
    }
    if (endDate) {
      query.push({ updatedAt: { $lte: endDate } })
    }

    if (query.length <= 0) {
      const dateRange = wishRouter.getDefaultDateRange(wishRouter.today())
      query.push({ updatedAt: { $gt: dateRange[0] } })
      query.push({ updatedAt: { $lte: dateRange[1] } })
    }

    if (types) {
      const typeArray = types.split(',')
      const typeQuery = []
      typeArray.forEach(t => {
        typeQuery.push({ type: typeArray })
      })
      query.push({ $or: typeQuery })
    }

    const sorter = (() => {
      if (sort === 'asc') {
        return { updatedAt: 1 }
      } else if (sort === 'desc') {
        return { updatedAt: -1 }
      } else {
        return {}
      }
    })()

    const rs = await Wish.find({
      $and: query
    }).sort(sorter)

    if (sort) {
      const groupedWishes = []
      let currentGroup = null
      let prevYear = null
      let prevMonth = null

      function yearMonthMatch(year, month) {
        // probably the first time, so no match
        if (prevYear === null || prevMonth === null) {
          return false
        }
        return prevYear === year && prevMonth === month
      }

      rs.forEach(wish => {
        const year = new Date(wish.updatedAt).getFullYear()
        const month = new Date(wish.updatedAt).getMonth() + 1
        if (!yearMonthMatch(year, month)) {
          if (currentGroup) {
            groupedWishes.push({
              year: prevYear,
              month: prevMonth,
              wishes: currentGroup
            })
          }
          currentGroup = []
          prevYear = year
          prevMonth = month
        }
        currentGroup.push(wish)
      })
      groupedWishes.push({
        year: prevYear,
        month: prevMonth,
        wishes: currentGroup
      })
      res.send(groupedWishes)
    } else {
      res.send(rs)
    }
  })
  .post((req, res) => {
    let wish = new Wish(req.body)
    wish.save(function (err, wish) {
    if (err) return res.status(422).send(err);
    return res.status(201).send(wish)
    });
  })

wishRouter
  .route('/:id')
  .get((req, res) => {
    Wish.findById(req.params.id, (err, wish) => {
      return res.send(wish)
    })
  })
  .put((req, res) => {
    Wish.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, wish) => {
        if (err) return res.status(409).send(err)
        return res.status(200).send(wish)
      }
    )
  })
  .delete((req, res) => {
    Wish.findByIdAndRemove(req.params.id, (err, wish) => {
      if (err) return res.status(500).send(err)
      const response = {
        message: 'Wish successfully deleted',
        id: wish._id
      }
      return res.status(200).send(response)
    })
  })

module.exports = wishRouter
