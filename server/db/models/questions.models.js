const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
  id: Number,
  question: String,
  jobs: [
    {
      id: Number,
      title: String
    }
  ]
}, {timestamps: true})

module.exports = mongoose.model('questions', questionsSchema)