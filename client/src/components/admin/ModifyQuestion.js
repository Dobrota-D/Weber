import React, { useState } from 'react';
import { useForm } from 'react-hook-form'

import Warning from '../../assets/svg/Warning';
import JobCheckbox from './JobCheckbox';

export default function ModifyQuestion(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [question, setQuestion] = useState(props.question.question);
  
  const URL = process.env.REACT_APP_BACKEND_URL
  const id = props.questionId

  // Empty array for all job's checkbox
  const [jobsCheckedState, setJobsCheckedState] = useState(new Array(props.jobs.length).fill(false))
  
  const updateJobState = id => {
    // Update a job's state in the jobsCheckedState array
    setJobsCheckedState(jobsCheckedState => jobsCheckedState.map((state, index) => index === id ? !state : state))
  }
  
  const onSubmit = data => {
    // Add job's status to data
    data.jobs = jobsCheckedState
    // Reorganize data to match with DB question's model
    const organizedData = organizeData(data, props.jobs)
    
    // Make the question modification
    fetch(`${URL}/questions/${id}`, { method: 'PATCH', body: JSON.stringify(organizedData) })
    .then(res => res.json())
    .then(res => props.hideModifyForm(true))
  }
  
  return <div className='modify-question-component'>
    <form onSubmit={handleSubmit(onSubmit)} className='modify-question-form'>
      
      <div className='input-group'>
        <input {...register(
          "question",
          { required: 'Champ obligatoire' }
        )}
        value={ question }
        onChange={ e => setQuestion(e.target.value) }
        autoFocus
        />
        { errors.question &&
          <div className='error-msg'>
            <Warning />
            <p>{ errors.question.message }</p>
          </div>
        }
      </div>
      
      <div className='jobs-group'>
        {
          props.jobs.map((job, index) => {
            return (
              <JobCheckbox
                job={job}
                questionJobs={props.question.jobs}
                isChecked={jobsCheckedState[index]}
                updateState={id => updateJobState(id)} 
                register={register}
                key={index}
              />
            )
          })
        }
      </div>
      
      <input type='submit' className='submit' value='Sauvegarder' />
      <span onClick={props.hideModifyForm} className='cancel-btn'>Annuler</span>
    </form>
  </div>;
}

function organizeData(data, jobs) {
  // Reorganize data to match with DB question's model
  let questionJobs = []
  
  data.jobs.forEach((job, index) => {
    if (job) {
      questionJobs.push({
        id: index,
        title: jobs[index].title,
        content: jobs[index].content
      })
    }
  })
  
  const organizedData = {
    question: data.question,
    jobs: questionJobs
  }
  
  return organizedData
}