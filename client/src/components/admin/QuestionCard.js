import React, { useState } from 'react';

import ModifyQuestion from './ModifyQuestion';

import Pen from '../../assets/svg/Pen'
import Bin from '../../assets/svg/Bin'

export default function QuestionCard(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const question = props.data.question
  const id = props.data._id
  const questionJobs = props.data.jobs
  const allJobs = props.jobs
  
  function deleteQuestion(id) {
    // Delete a question 
    const URL = process.env.REACT_APP_BACKEND_URL
    
    // remove question from DB
    fetch(`${URL}/questions/${id}`, { method: 'DELETE' })
    .then(() => {
      setShowConfirmation(false)
      // Call parent function to remove component from the displayed list
      props.deleteThisComponent()
    })
  }
  
  const handleHideModifyForm = refresh => {
    // Hide the modify question form
    setIsEditMode(false)
    
    // If refresh variable is declared, refresh the questions list
    if (refresh) props.refreshQuestions()
  }
  
  return <div className='question-card'>
    <div className='data'>
      <div>
        <p className='question'>{ question }</p>
        
        <div className='jobs'>
          { questionJobs.map((job, index) => {
            return ( <p className='job' key={index}>{ job.title }{ index < questionJobs.length - 1 && ', '}</p> )
          }) }
        </div>

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
            <p onClick={() => deleteQuestion(id)}>Supprimer</p>
            <p onClick={() => setShowConfirmation(false)}>Annuler</p>
          </div>
        }
        
        
      </div>
    </div>
      {
        // Display the 'modify question' over the question card
        isEditMode &&
        
        <ModifyQuestion
          question={props.data}
          jobs={allJobs}
          questionId={id}
          hideModifyForm={refresh => handleHideModifyForm(refresh)}
        />
      }
  </div>;
}