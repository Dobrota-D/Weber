const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Jobs = db.models.jobs

router.get('/', async (req, res) => {
  // Return all jobs
  const jobs = await Jobs.find()
  res.status(200).send({ jobs })
})
router.post('/', async (req, res) => {
  // Create a new job
  const job = new Jobs({
    id: 4,
    title: "Métier 04"
  })
  await job.save()
  
  res.status(200).send({ msg: 'New job created' })
})
router.delete('/:id', (req, res) => {
  // Delete a job
  const id = req.params.id
  
  Jobs.findByIdAndDelete(id, err => {
    if (err) res.status(400).send({ error: err })
    else res.status(200).send({ msg: `Job ${id} deleted` })
  })
})


module.exports = router