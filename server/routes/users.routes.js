const express = require('express')
const router = express.Router()

const authenticateToken = require('../middleware/authenticateToken')

const db = require('../db/export')
const Users = db.models.users
const Jobs = db.models.jobs
const Questions = db.models.questions

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
router.post('/reset', authenticateToken, async(req, res) => {
  // Reset all user's data
  const user = await Users.findById(req.user._id)
  
  // Reset user's questions
  const questions = await Questions.find()
  user.questions = []
  
  questions.forEach(question => {
    user.questions.push({
      questionId: question.id,
      hasAnswer: false,
    })
  })
  
  // Reset user's stats
  const jobs = await Jobs.find()
  user.stats = []
  
  jobs.forEach(job => {
    user.stats.push({
      jobId: job.id,
      percentage: 0
    })
  })
  
  user.save(() => {
    res.status(200).send({ status: 200, msg: 'Utilisateur réinitialisé' })
  })
})


module.exports = router
