import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'

import Warning from '../../assets/svg/Warning';

export default function CreateQuestion(props) {
  const { register, handleSubmit, formState: { errors }, setError, clearErrors, reset } = useForm();
  
  const [jobsCheckedState, setJobsCheckedState] = useState()
  const [showSuccessCreation, setShowSuccessCreation] = useState(false)
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
      .then(() => {
        setShowJobsList(false)
        setShowSuccessCreation(true)
        // Refresh the questions list
        props.refreshQuestions()
        // Reset input content
        reset({ question: '' })
        setTimeout(() => setShowSuccessCreation(false), 2000);
      })
    }
  }
  return <div className='create-question-component'>
    <p>Ajouter une question</p>
    <form onSubmit={handleSubmit(onSubmit)} className='create-question-form'>
      <div className='input-group'>
        <input {...register(
            "question",
            { required: 'Champ obligatoire' }
          )}
          className='question-input'
          placeholder='Nouvelle question...'
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
      
      <div className='btns'>
        <input type='submit' className='submit' value={'Ajouter'} onClick={() => clearErrors('checkbox')} />
        { showSuccessCreation && <p className='success-msg'>Nouvelle question ajoutée</p> }
      </div>
    </form>
  </div>;
}