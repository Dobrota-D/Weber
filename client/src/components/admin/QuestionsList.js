import React, { useEffect, useState } from 'react';

import QuestionCard from './QuestionCard';

export default function QuestionsList(props) {
  const URL = process.env.REACT_APP_BACKEND_URL
  
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState();
  const [jobs, setJobs] = useState();
  
  useEffect(() => {
    // Get all questions at the load of the component
    loadQuestions()
    // eslint-disable-next-line
  }, [])

  // Trigger the refresh of the questions list
  // Triggered by parent, at the creation of a new question
  props.refreshQuestions.current = () => loadQuestions()
  
  function deleteQuestion(id) {
    // Remove a specific question from the 'questions' array
    const newQuestions = questions.filter(question => question._id !== id)
    setQuestions(newQuestions)
  }
  
  const loadQuestions = () => {
    // Load all questions
    setIsLoading(true)
    
    fetch(`${URL}/questions`)
    .then(res => res.json())
    .then(res => {
      setQuestions(res.questions)
      
      // Load all jobs
      fetch(`${URL}/jobs`)
      .then(res => res.json())
      .then(async res => {
        setJobs(res.jobs)
        setIsLoading(false)
      })
    })
  }
  
  if (isLoading) return (<div className='loading'>Chargement des questions...</div>)
  
  return <div className='question-list'>
    { questions.length > 0 ?
       questions.map((question, index) => {
        return (
          <QuestionCard
            data={question}
            jobs={jobs} 
            key={index}
            deleteThisComponent={() => deleteQuestion(question._id)}
            refreshQuestions={() =>  loadQuestions()}
          /> 
        )
      })
      :
      <div className='loading'>Aucune question trouvée</div>
    }
  </div>
}