const mongoose = require('mongoose')

const questionsSchema = new mongoose.Schema({
  question: String,
  jobs: Array  
}, {timestamps: true})

module.exports = mongoose.model('questions', questionsSchema)