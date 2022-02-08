const express = require('express')
const router = express.Router()

router.use('/', (req, res) => {
  res.status(200).send({ msg: 'questions' })
})


module.exports = router