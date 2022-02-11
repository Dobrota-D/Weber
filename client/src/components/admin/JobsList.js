import React, { useState, useEffect } from 'react'

import JobCard from './JobCard';

export default function JobsList(props) {
  const URL = process.env.REACT_APP_BACKEND_URL
  
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState();
  
  useEffect(() => {
    // Get all jobs at the load of the component
    loadJobs()
    // eslint-disable-next-line
  }, [])

  // Trigger the refresh of the job list
  // Triggered by parent, at the creation of a new job
  props.refreshJobs.current = () => loadJobs()
  
  function deleteJob(id) {
    // Remove a specific job from the 'jobs' array
    const newJobs = jobs.filter(job => job._id !== id)
    setJobs(newJobs)
  }
  
  const loadJobs = () => {
    // Load all jobs
    setIsLoading(true)
    
    fetch(`${URL}/jobs`)
    .then(res => res.json())
    .then(res => {
      setJobs(res.jobs)
      setIsLoading(false)
    })
  }
  
  if (isLoading) return (<div className='loading'>Chargement des métiers...</div>)
  
  return <div className='jobs-list'>
    { jobs.length > 0 ?
       jobs.map((job, index) => {
        return (
          <JobCard
            job={job}
            key={index}
            deleteThisComponent={() => deleteJob(job._id)}
            refreshJobs={() => loadJobs()}
          /> 
        )
      })
      :
      <div className='loading'>Aucun métier trouvé</div>
    }
  </div>
}
