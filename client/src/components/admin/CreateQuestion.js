import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'

import Warning from '../../assets/svg/Warning';

export default function CreateQuestion() {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();
  
  const [jobsCheckedState, setJobsCheckedState] = useState()
  const [jobs, setJobs] = useState();
  const [showJobsList, setShowJobsList] = useState(false)
  
  const URL = process.env.REACT_APP_BACKEND_URL
  
  useEffect(() => {
    // Get all jobs
    fetch(`${URL}/jobs`)
    .then(res => res.json())
    .then(res => {
      setJobs(res.jobs)
      setJobsCheckedState(new Array(res.jobs.length).fill(false))
    })
  }, [URL])
  
  const handleCheckboxChange = id => {
    // Change a checkbox status
    setJobsCheckedState(jobsCheckedState => jobsCheckedState.map((state, index) => index === id ? !state : state))
  }

  const onSubmit = data => {
    // Check if at least one checkox is checked
    if (data.checkbox0 === undefined) {
      setShowJobsList(true)
      
      setError('checkbox', {
        type: "manual",
        message: 'Cochez au moins un métier',
      })
    } else {
      // Create the new question
      fetch(`${URL}/questions`, { method: 'POST', body: JSON.stringify(data) })
      .then(res => res.json())
      .then(res => {
        console.log(res);
      })
    }
  }
  return <div className='create-question-component'>
    <p>Ajouter une qestion</p>
    <form onSubmit={handleSubmit(onSubmit)} className='create-question-form'>
      <div className='input-group'>
        <input {...register(
            "question",
            { required: 'Champ obligatoire' }
          )}
          className='question-input'
          placeholder='Écrivez votre nouvelle question...'
          autoFocus
        />
        { errors.question &&
          <div className='error-msg'>
            <Warning />
            <p>{ errors.question.message }</p>
          </div>
        }
      </div>
      
      <div className='jobs-list-container'>
        
        <p className={`${showJobsList ? 'deployed' : 'hide'} jobs-list-status`} onClick={() => setShowJobsList(!showJobsList)}>
          { showJobsList ? 'Réduire' : 'Afficher les métiers' }
        </p>
        
        <div className='jobs-list'>
          { showJobsList && jobs.map(job => {
              return (
                <div key={job.id}>
                  <input
                    {...register(`checkbox${job.id}`)}
                    type='checkbox'
                    checked={jobsCheckedState[job.id]}
                    onChange={() => handleCheckboxChange(job.id)}
                    id={job.id}
                    key={job.id}
                  />
                  <label htmlFor={job.id}>{ job.title }</label>
                </div>
              )
          }) }
          { errors.checkbox &&
            <div className='error-msg'>
              <Warning />
              <p>{ errors.checkbox.message }</p>
            </div>
          }
        </div>
      </div>
      
      <input type='submit' className='submit' value={'Ajouter'} onClick={() => clearErrors('checkbox')} />
      
    </form>
  </div>;
}
function organizeData(data) {
  // Orgnaize data to match with DB question's model
  let jobs = []
  
  Object.keys(data).forEach(key => {
    const value = data[key]
    const jobId = key.replace('checkbox', '')
    if (value && key !== 'question') jobs.push({ id: jobId })
  })
  
  const organizedData = {
    question: data.question,
    jobs
  }
  
  return organizedData
}