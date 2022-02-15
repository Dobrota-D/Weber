const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).send({ status: 401, msg: 'Le token d\'authentification est manquant' })

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
        return res.status(401).send({ status: 401, msg: 'Token d\'authentification invalide' })
    }
    req.user = user
    req.userId = user._id
    next()
  })
}