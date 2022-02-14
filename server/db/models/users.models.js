const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  data: Array
}, {timestamps: true})

module.exports = mongoose.model('users', usersSchema)