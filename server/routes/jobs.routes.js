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
  const data = JSON.parse(req.body)
  data.id = await getJobId()
  
  const job = new Jobs(data)
  await job.save(err => {
    if (err) res.status(400).send({ error: err })
    else res.status(200).send({ msg: 'New job created' })
  })
})
router.delete('/:id', (req, res) => {
  // Delete a job
  const id = req.params.id
  
  Jobs.findByIdAndDelete(id, err => {
    if (err) res.status(400).send({ error: err })
    else res.status(200).send({ msg: `Job ${id} deleted` })
  })
})
router.patch('/:id', (req, res) => {
  // Update a specific job
  const id = req.params.id
  const data = JSON.parse(req.body)
  
  Jobs.findByIdAndUpdate(id, data, { new: true }, (err) => {
    if (err) res.status(400).send({ error: err })
    else res.status(200).send({ msg: 'Job updated' })
  })
})


/* FINCTIONS */
async function getJobId() {
  // Return a unique id for the creation of a job
  const jobs = await Jobs.find()
  
  // Get the highest id from the jobs list
  const highestId = Math.max.apply(Math, jobs.map(job => { return job.id; }))
  return highestId + 1
}

module.exports = router