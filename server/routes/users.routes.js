const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Users = db.models.users



module.exports = router
