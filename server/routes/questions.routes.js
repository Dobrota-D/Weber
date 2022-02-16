const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/authenticateToken");

const db = require("../db/export");
const Questions = db.models.questions;
const Jobs = db.models.jobs;
const Users = db.models.users;

router.get("/", authenticateToken, async (req, res) => {
  // Return questions
  const user = await Users.findById(req.user._id);
  const questions = await Questions.find();

  if (req.query.hasAnswer === "false") {
    // Send questions not answered by the user
    const notAnsweredQuestions = user.questions.filter(
      (question) => !question.hasAnswer
    );
    let userQuestions = [];

    notAnsweredQuestions.forEach((question, index) => {
      userQuestions.push({
        questionId: question.questionId,
        hasAnswer: question.hasAnswer,
        title: questions[question.questionId].question
      });
    });

    return res.status(200).send({ status: 200, questions: userQuestions });
  }
  else if (req.query.hasAnswer === 'true') {
    // Send all answered questions by the user
    const answeredQuestions = user.questions.filter(question => question.hasAnswer)
    let userQuestions = []
    
    answeredQuestions.forEach(question => {
      userQuestions.push({
        questionId: question.questionId,
        hasAnswer: question.hasAnswer,
        title: questions[question.questionId].question
      })
    })
    
    return res.status(200).send({ status: 200, questions: userQuestions })
  }
  
  res.status(200).send({ status: 200, questions })
})
router.get('/:id', async (req, res) => {
  // Return all questions
  const questions = await Questions.find();
  res.status(200).send({ questions });
});
router.get("/:id", async (req, res) => {
  // Return a specific question
  const id = req.params.id;

  Questions.findById(id, (err, data) => {
    if (err) res.status(404).send({ error: err });
    else res.status(200).send(data);
  });
});
router.post("/", async (req, res) => {
  // Create a new question
  const data = JSON.parse(req.body);

  // Reorganize data to match with the question's model
  const reorganizedData = await reorganizeData(data);

  const question = new Questions(reorganizedData);
  await question.save((err) => {
    if (err) res.status(400).send({ error: err });
    else res.status(200).send({ msg: "New question created" });
  });
});
router.post("/answer", authenticateToken, async (req, res) => {
  // Update user's data after an anwser
  const data = JSON.parse(req.body);
  const answer = data.answer;
  const questionId = data.questionId;

  const user = await Users.findById(req.userId);

  // Find the question in the user's profile
  const userQuestion = user.questions.filter(
    (question) => question.questionId === questionId
  )[0];
  // Update the question
  userQuestion.hasAnswer = true;
  userQuestion.response = answer;

  // Update the user's stats with the user's answer
  const question = await Questions.findOne({ id: questionId });
  const questionJobs = question.jobs;

  // Get the question's jobs in the user's profile
  const userStats = user.stats.filter((job) =>
    questionJobs.find((questionJob) => questionJob.id === job.jobId)
  );

  // Update the percentage
  userStats.forEach((job) => {
    if (answer === "yes") job.percentage += 10;
    else if (answer === "no" && job.percentage > 9) job.percentage -= 10;
  });

  user.save(() => {
    res.status(200).send({
      status: 200,
      msg: `Responded ${
        answer === null ? "🤷‍♂️" : answer
      } to question ${questionId}`,
      stats: userStats,
    });
  });
});
router.delete("/:id", (req, res) => {
  // Delete a question
  const id = req.params.id;

  Questions.findByIdAndDelete(id, (err) => {
    if (err) res.status(404).send({ error: err });
    else res.status(200).send({ msg: `Question ${id} deleted` });
  });
});
router.patch("/:id", (req, res) => {
  // Update a specific question
  const id = req.params.id;
  const data = JSON.parse(req.body);

  Questions.findByIdAndUpdate(id, data, { new: true }, (err) => {
    if (err) res.status(400).send({ error: err });
    else res.status(200).send({ msg: "Question updated" });
  });
});

/* FUNCTIONS */

async function reorganizeData(data) {
  // Reorganize data to match with the question's model
  const jobs = await getJobs(data);

  const organizedData = {
    id: await getQuestionId(),
    question: data.question,
    jobs,
  };
  return organizedData;
}
async function getJobs(data) {
  // Organize question's jobs
  let jobs = [];

  for (const key in data) {
    const value = data[key];

    const jobId = key.replace("checkbox", "");

    if (value && key !== "question") {
      // Get job's title by id
      const jobTitle = await Jobs.findOne({ id: jobId }).then((job) => {
        return job.title;
      });

      const job = { id: jobId, title: jobTitle };
      jobs.push(job);
    }
  }
  return jobs;
}
async function getQuestionId() {
  // Return a unique id for the creation of a question
  const questions = await Questions.find();

  // Get the highest id from the jobs list
  const highestId = Math.max.apply(
    Math,
    questions.map((question) => {
      return question.id;
    })
  );
  return highestId === -Infinity ? 0 : highestId + 1;
}

module.exports = router;
