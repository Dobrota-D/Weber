import React from 'react';

import QuestionsList from './QuestionsList';
import CreateQuestion from './CreateQuestion';

export default function QuestionsTab() {
  return <div className='wrapper'>
    <CreateQuestion />
    <QuestionsList />
  </div>;
}
