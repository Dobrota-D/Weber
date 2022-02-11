const mongoose = require('mongoose')

const jobsSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String
}, {timestamps: true})

module.exports = mongoose.model('jobs', jobsSchema)