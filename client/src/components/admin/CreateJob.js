import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import Warning from '../../assets/svg/Warning';

export default function CreateJob(props) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [showSuccessCreation, setShowSuccessCreation] = useState(false)
  
  const URL = process.env.REACT_APP_BACKEND_URL
  
  const onSubmit = data => {
    // Create the new question
    fetch(`${URL}/jobs`, { method: 'POST', body: JSON.stringify(data) })
    .then(res => res.json())
    .then(() => {
      setShowSuccessCreation(true)
      // Refresh the jobs list
      props.refreshJobs()
      // Reset input content
      reset({ title: '', content: '' })
      setTimeout(() => setShowSuccessCreation(false), 2000);
    })
  }
  
  return (
    <div className='create-job-component'>
      <p>Ajouter un métier</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className='create-job-form'>
        
        <div className='input-group'>
          <input {...register(
              "title",
              { required: 'Champ obligatoire' }
            )}
            className='job-input'
            placeholder='Nouveau métier...'
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
          placeholder='Description'
        />
        { errors.content &&
          <div className='error-msg'>
            <Warning />
            <p>{ errors.content.message }</p>
          </div>
        }
      </div>
      
      <div className='btns'>
        <input type='submit' className='submit' value={'Ajouter'} />
        { showSuccessCreation && <p className='success-msg'>Nouveau métier ajouté</p> }
      </div>
        
      </form>
    </div>
  )
}
