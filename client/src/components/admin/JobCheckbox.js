import React, { useEffect } from 'react';

export default function JobCheckbox(props) {
  
  useEffect(() => {
    // Loop on question jobs to check or not the checkbox
    props.questionJobs.forEach(job => {
      const id = job.id
      if (props.job.id === id) {
        // Update the parent job's state array
        props.updateState(props.job.id)
      }
    });
    // eslint-disable-next-line
  }, [])
  
  const handleChange = () => {
    // Update the parent job's state array
    props.updateState(props.job.id)
  }
  
  return <div>
    <input
      type='checkbox'
      checked={props.isChecked}
      onChange={handleChange}
      id={props.job.id} />
    <label htmlFor={props.job.id}>{ props.job.title }</label>
  </div>;
}
