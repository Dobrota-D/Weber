import React from 'react';

export default function QuestionCard(props) {
  const question = props.data.question
  const jobs = props.data.jobs
  
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
      <button></button>
      
    </div>
  </div>;
}
