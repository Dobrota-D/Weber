import React, { useState } from 'react';

import ModifyQuestion from './ModifyQuestion';

import Pen from '../../assets/svg/Pen'
import Bin from '../../assets/svg/Bin'

export default function QuestionCard(props) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  
  const question = props.data.question
  const id = props.data._id
  const jobs = props.data.jobs
  
  function deleteQuestion(id) {
    // Delete a question 
    const URL = process.env.REACT_APP_BACKEND_URL
    
    // remove question from DB
    fetch(`${URL}/questions/${id}`, { method: 'DELETE' })
    .then(() => {
      // Call parent function to remove component from the displayed list
      props.deleteThisComponent()
    })
  }
  
  return <div className='question-card'>
    <div>
      <p className='question'>{ question }</p>
      
      <div className='jobs'>
        { jobs.map((job, index) => {
          return ( <p className='job' key={index}>{ job.title }{ index < jobs.length - 1 && ', '}</p> )
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
      {
        // Display the 'modify question' over the question card
        //isEditMode && <ModifyQuestion />
      }
  </div>;
}

function editQuestion(id) {
  // Edit a question
  console.log(`Edit question ${id}`);
}
