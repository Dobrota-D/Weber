const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: Boolean,
  questions: [
    {
      questionId: Number,
      hasAnswer: Boolean,
      response: String // Must be yes, no or null
    }
  ],
  stats: [
    {
      jobId: Number,
      percentage: Number
    }
  ]
}, {timestamps: true})

module.exports = mongoose.model('users', usersSchema)