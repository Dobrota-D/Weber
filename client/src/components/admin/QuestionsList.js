import React, { useEffect, useState } from 'react';

import QuestionCard from './QuestionCard';

export default function QuestionsList() {
  const URL = process.env.REACT_APP_BACKEND_URL
  
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState();
  
  useEffect(() => {
    // Get all questions at the load of the component
    
    fetch(`${URL}/questions`)
    .then(res => res.json())
    .then(res => {
      setQuestions(res.questions)
      setIsLoading(false)
    })
  }, [URL])
  
  if (isLoading) return (<div className='loading'>Chagement des questions...</div>)
  
  return <div className='question-list'>
    { questions.map((question, index) => {
      return ( <QuestionCard data={question} key={index} /> )
    }) }
  </div>
}