import React, { useEffect, useState } from 'react';



export default function QuestionsList() {
  const URL = process.env.REACT_APP_BACKEND_URL
  
  const [isLoading, setIsLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  
  useEffect(() => {
    // Get all questions at the load of the component
    
    fetch(`${URL}/questions`)
    .then(res => res.json())
    .then(res => {
      setQuestions(res)
      setIsLoading(false)
    })
  }, [URL])
  
  if (isLoading) return (<div className='loading'>ça charge</div>)
  
  return <div>
    
  </div>
}