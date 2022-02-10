import React from 'react';

import QuestionsList from './QuestionsList';
import CreateQuestion from './CreateQuestion';

export default function QuestionsTab() {
  const refreshQuestions = React.useRef(null)
  
  return <div className='wrapper'>
    <CreateQuestion refreshQuestions={() => refreshQuestions.current()} />
    <QuestionsList refreshQuestions={refreshQuestions} />
  </div>;
}
