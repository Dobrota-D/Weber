const express = require('express')
const router = express.Router()

const db = require('../db/export')
const Questions = db.models.questions

router.get('/', async (req, res) => {
  // Return all questions
  const questions = await Questions.find()
  res.status(200).send({ questions })
})
router.post('/', async (req, res) => {
  // Create a new question
  const question = new Questions({
    /* question: 'Question 04',
    jobs: [
      {
        id: 0,
        title: 'Métier 0'
      }
    ] */
  })
  await question.save()
  
  console.log('new question created');
  res.status(200).send({ msg: 'New question created' })
})
router.delete('/:id', (req, res) => {
  // Delete a question
  /* const id = req.params.id
  Questions.findOneAndDelete({ id }, err => {
    if (err) res.status(404).send({ msg: err })
    else res.status(200).send({ msg: `Question ${id} deleted` })
  }) */
})

module.exports = router