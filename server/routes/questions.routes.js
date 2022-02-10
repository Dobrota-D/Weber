const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Questions = db.models.questions
const Jobs = db.models.jobs

router.get('/', async (req, res) => {
  // Return all questions
  const questions = await Questions.find()
  res.status(200).send({ questions })
})
router.get('/:id', async (req, res) => {
  // Return a specific question
  const id = req.params.id

  Questions.findById(id, (err, data) => {
    if (err) res.status(404).send({ error: err })
    else res.status(200).send(data)
  })
})
router.post('/', async (req, res) => {
  // Create a new question
  const data = JSON.parse(req.body)
  
  // Reorganize data to match with the question's model
  const reorganizedData = await reorganizeData(data)
  console.log('here', reorganizedData);
  
  //const question = new Questions({})
  
  
  //await question.save()
  
  res.status(200).send({ msg: 'New question created' })
})
router.delete('/:id', (req, res) => {
  // Delete a question
  const id = req.params.id
  
  Questions.findByIdAndDelete(id, err => {
    if (err) res.status(404).send({ error: err })
    else res.status(200).send({ msg: `Question ${id} deleted` })
  })
})
router.patch('/:id', (req, res) => {
  // Update a specific question
  const id = req.params.id
  const data = JSON.parse(req.body)
  
  Questions.findByIdAndUpdate(id, data, { new: true }, (err) => {
    if (err) res.status(400).send({ error: err })
    else res.status(200).send({ msg: 'Question updated' })
  })
})


/* FUNCTION */
async function reorganizeData(data) {
  // Reorganize data to match with the question's model
  let jobs = []
  
  const objectLoop = async () => {
    Object.keys(data).forEach(async key => {
      const value = data[key]
      const jobId = key.replace('checkbox', '')
      if (value && key !== 'question') {
        // Get job's title by id
        const jobTitle = await Jobs.findOne({ id: jobId }).then(job => { return job.title })
        
        const job = { id: jobId, title: jobTitle }
        jobs.push(job)
      }
    })
    console.log(jobs);
  }
  await objectLoop()
  
  const organizedData = {
    question: data.question,
    jobs
  }
  console.log('ahhhh', organizedData);
  return organizedData
}


module.exports = router