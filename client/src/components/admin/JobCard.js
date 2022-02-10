import React, { useState } from 'react'

import ModifyJob from './ModifyJob';

import Pen from '../../assets/svg/Pen'
import Bin from '../../assets/svg/Bin'

export default function JobCard(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const job = props.job
  const id = props.job._id
  
  function deleteJob(id) {
    // Delete a job 
    const URL = process.env.REACT_APP_BACKEND_URL
    
    // remove question from DB
    fetch(`${URL}/jobs/${id}`, { method: 'DELETE' })
    .then(() => {
      setShowConfirmation(false)
      // Call parent function to remove component from the displayed list
      props.deleteThisComponent()
    })
  }
  
  const handleHideModifyForm = refresh => {
    // Hide the modify job form
    setIsEditMode(false)
    
    // If refresh variable is declared, refresh the jobs list
    if (refresh) props.refreshJobs()
  }
  
  return <div className='job-card'>
    <div className='data'>
      <div className='title-and-content'>
        <p className='job'>{ job.title }</p>
        <p className='content'>{ job.content }</p>
      </div>
      
      <div className='btns'>
        
        <button onClick={() => setIsEditMode(true)}>
          <Pen />
        </button>

        <button onClick={() => setShowConfirmation(true)}>
          <Bin />
        </button>
        
        { showConfirmation &&
          <div className='confirmation-btn'>
            <p onClick={() => deleteJob(id)}>Supprimer</p>
            <p onClick={() => setShowConfirmation(false)}>Annuler</p>
          </div>
        }
      </div>
    </div>
    {
      // Display the 'modify job' over the job card
      isEditMode &&
      
      <ModifyJob
        job={props.job}
        jobId={id}
        hideModifyForm={refresh => handleHideModifyForm(refresh)}
      />
    }
  </div>;
}
