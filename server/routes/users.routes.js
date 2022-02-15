const express = require('express')
const router = express.Router()

const authenticateToken = require('../middleware/authenticateToken')

const db = require('../db/export')
const Users = db.models.users
const Jobs = db.models.jobs

router.get('/stats', authenticateToken, async(req, res) => {
  // Return the stats of a user
  const user = await Users.findById(req.user._id)
  const userStats = user.stats
  let stats = []
  
  // Get all jobs
  const jobs = await Jobs.find()
  
  // Organize data to match with frontend
  userStats.forEach((stat, index) => {
    stats.push({
      jobId: stat.jobId,
      title: jobs[index].title,
      percentage: stat.percentage,
    })
  })
  
  res.status(200).send({ status: 200, stats })
})


module.exports = router
