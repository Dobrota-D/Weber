require('dotenv').config()
const express = require('express')
const cors = require('cors')

// App init
const app = express()
const PORT = process.env.PORT
app.use(express.json())
app.use(cors())

app.listen(PORT, () => console.log(`Server listenning on port ${PORT}`))

// DB init
const db = require('./db/export')
db.connect()

// Routes init
const routes = require('./routes/export.routes')

app.use('/jobs', routes.jobs)
app.use('/questions', routes.questions)
