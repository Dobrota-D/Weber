const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Questions = db.models.questions

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
  const question = new Questions({
    question: 'Question 10',
    jobs: [
      {
        id: 0,
        title: 'Métier 0'
      }
    ]
  })
  await question.save()
  
  console.log('new question created');
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

module.exports = router