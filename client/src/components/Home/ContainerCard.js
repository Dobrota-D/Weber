import React, { useEffect, useState } from "react";
import Swipe from "./Swipe";

export default function ContainerCard() {
  const [questions, setQuestions] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    // Get all questions not answered by the user
    fetch(`${URL}/questions?hasAnswer=false`, { headers: { 'authorization': `Bearer ${token}` }})
    .then(res => res.json())
    .then(res => {
      if (res.status === 200) {
        setQuestions(res.questions)
        setIsLoading(false)
      }
    })
  }, [URL, token])
  
  console.log(questions);
  
  if (isLoading) return( <div className="loading">Chargement des questions...</div> )
  
  return (
    <div className="container-cards">
      <Swipe />
    </div>
  );
}
