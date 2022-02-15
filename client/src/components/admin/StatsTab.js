import React, { useEffect, useState } from 'react';

export default function StatsTab() {
  const [isLoading, setIsLoading] = useState(true)
  const [average, setAverage] = useState()
  const [jobs, setJobs] = useState()
  const [questions, setQuestions] = useState()
  
  const URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    const fetchData = async() => {
      const tempJobs = await getJobs()
      const tempQuestions = await getQuestions()
      // Get average number of questions per job
      await getAverage(tempJobs, tempQuestions)
    }
    fetchData().then(async () => setIsLoading(false))
  }, [])
  
  const getJobs = async() => {
    // Get all jobs
    let toReturn
    
    await fetch(`${URL}/jobs`)
    .then(res => res.json())
    .then(res =>  {
      setJobs(res.jobs)
      toReturn = res.jobs
    })
    return toReturn
  }
  const getQuestions = async() => {
    // Get all questions
    let toReturn
    
    await fetch(`${URL}/questions`, { headers: { 'authorization': `Bearer ${token}` }})
    .then(res => res.json())
    .then(res => {
      setQuestions(res.questions)
      toReturn = res.questions
    })
    return toReturn
  }
  const getAverage = async(jobs, questions) => {
    // Get average number of questions per job
    let jobsData = []
    
    jobs.forEach(job => {
      const jobId = job.id
      let nbQuestions = 0
      
      questions.forEach(question => {
        question.jobs.forEach(questionJob => {
          if (questionJob.id === job.id) nbQuestions++
        })
      })
      jobsData.push({ jobId, nbQuestions })
    })
    // At this point we have the number of questions for each job
    // Now we do the average
    let sum

    jobsData.forEach(job => {
      const nbQuestions = job.nbQuestions
      
      if (sum === undefined) sum = nbQuestions
      else sum += nbQuestions
    })
    const average = sum / jobsData.length
    setAverage(average)
  }
  
  if(isLoading) return(<div className='loading'>Chargement des données...</div>)
  
  return <div className='data-container'>
    <p className='title'>Statistiques du site</p>
    <div className='data-list'>
      <p className='nb-jobs'><span>{jobs.length}</span> métier{jobs.length > 1 && 's'}</p>
      <p className='nb-questions'><span>{questions.length}</span> question{questions.length > 1 && 's'}</p>
      <p className='average-questions-per-job'><span>{average}</span> question{average > 1 && 's'} par métier en moyenne</p>
    </div>
  </div>;
}