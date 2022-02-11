import React, { useState } from 'react';

import QuestionsTab from './QuestionsTab'
import JobsTab from './JobsTab'
import StatsTab from './StatsTab'


export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('stats');
  
  return <div className='admin-panel'>
    <div className='tabs-nav'>
      <p
        className={activeTab === 'questions' ? 'active' : ''}
        onClick={() => setActiveTab('questions')}
      >
        Questions
      </p>
      <p
        className={activeTab === 'jobs' ? 'active' : ''}
        onClick={() => setActiveTab('jobs')}  
        >
          Métiers
      </p>
      <p
        className={activeTab === 'stats' ? 'active' : ''}
        onClick={() => setActiveTab('stats')}
      >
        Stats
      </p>
    </div>
    
    <div className='tab'>
      {
        activeTab === 'questions' ? <QuestionsTab /> :
        activeTab === 'jobs' ? <JobsTab /> :
        <StatsTab />
      }
    </div>
  </div>;
}
