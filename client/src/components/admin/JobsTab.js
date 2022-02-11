import React from 'react';

import CreateJob from './CreateJob';
import JobsList from './JobsList';

export default function JobsTab() {
  const refreshJobs = React.useRef(null)
  
  return <div className='wrapper'>
    <CreateJob refreshJobs={() => refreshJobs.current()} />
    <JobsList refreshJobs={refreshJobs} />
  </div>;
}
