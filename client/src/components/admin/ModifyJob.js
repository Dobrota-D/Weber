import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import Warning from '../../assets/svg/Warning';

export default function ModifyJob(props) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [jobTitle, setJobTitle] = useState(props.job.title);
  const [jobContent, setJobContent] = useState(props.job.content);
  
  const URL = process.env.REACT_APP_BACKEND_URL
  const id = props.jobId
  
  const onSubmit = data => {
    // Make the job modification
    fetch(`${URL}/jobs/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
    .then(res => res.json())
    .then(() => props.hideModifyForm(true))
  }
  
  return (
    <div className='modify-job-component'>
      <form onSubmit={handleSubmit(onSubmit)} className='modify-job-form'>
      
      <div className='input-group'>
        <input {...register(
          "title",
          { required: 'Champ obligatoire' }
        )}
        value={jobTitle}
        onChange={ e => setJobTitle(e.target.value) }
        autoFocus
        />
        { errors.title &&
          <div className='error-msg'>
            <Warning />
            <p>{ errors.title.message }</p>
          </div>
        }
      </div>
      
      <div className='input-group job-content-input-group'>
        <textarea {...register(
          "content",
          { required: 'Champ obligatoire' }
        )}
        value={jobContent}
        onChange={ e => setJobContent(e.target.value) }
        />
        { errors.content &&
          <div className='error-msg'>
            <Warning />
            <p>{ errors.content.message }</p>
          </div>
        }
      </div>
      
      <input type='submit' className='submit' value='Sauvegarder' />
      <span onClick={props.hideModifyForm} className='cancel-btn'>Annuler</span>
      
      </form>
    </div>
  )
}
