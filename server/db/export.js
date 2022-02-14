module.exports = {
  connect: require('./connection'),
  models: {
    jobs: require('./models/jobs.models'),
    questions: require('./models/questions.models'),
    users: require('./models/users.models')
  }
}