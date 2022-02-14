const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const saltRounds = 10

const jwt = require('jsonwebtoken')
const authenticateToken = require('../middleware/authenticateToken')

const db = require('../db/export')
const Users = db.models.users

router.get('/', authenticateToken, async(req, res) => {
  // Return user
  if (req.user) return res.status(200).send({ status: 200, user: req.user })
  else res.status(400).send({ status: 400, msg: 'User not found' })
})
router.post('/register', async(req, res) => {
  // Registration
  const data = JSON.parse(req.body)
  const username = data.username.toLowerCase()
  const password = bcrypt.hashSync(data.password, saltRounds)
  
  if (await Users.findOne({ username })) {
    return res.status(400).send({ status: 400, error: {input: 'username', msg: 'Nom d\'utilisateur déjà pris' }})
  }
  
  const user = new Users({ username, password, isAdmin: false, data: [] })
  const token = generateAccessToken(user)
  
  await user.save(() => {
    res.status(200).send({ status: 200, token })
  }) 
})
router.post('/login', async(req, res) => {
  // Login
  const data = JSON.parse(req.body)
  const username = data.username.toLowerCase()
  const user = await Users.findOne({ username })
  const password = data.password
  
  if (!await user) {
    return res.status(400).send({ status: 400, error: { input: 'username', msg: 'Nom d\'utilisateur inconnu' }})
  }
  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(400).send({ status: 400, error: { input: 'password', msg: 'Mot de passe incorrect' }})
  }
  
  const token = generateAccessToken(user)
  res.status(200).send({ status: 200, token })
})

function generateAccessToken(user) {
  return jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET)
}

module.exports = router