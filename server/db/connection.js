require('dotenv').config()
const mongoose = require('mongoose')

const DB_URI = process.env.DB_URI

module.exports = () => {
  mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => { console.log('Connected to db') })
  .catch((error) => { console.log(error) })
}