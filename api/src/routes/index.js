const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.send('hello')
})

// Wish route.
router.get('/wishes', function (req, res) {
  res.send('About this wiki');
})

module.exports = router
