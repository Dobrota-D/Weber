import React, { useEffect, useState } from 'react'

export default function ResultsFiability() {
  const [fiability, setFiability] = useState()
  const [answeredQuestions, setAnsweredQuestions] = useState()
  const [totalQuestions, setTotalQuestions] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  const URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    const setData = async() => {
      const tempAnsweredQuestions = await getAnsweredQuestions()
      const tempQuestions = await getTotalQuestions()
      
      // Calcul the fiability
      const calcFiability = (100 * tempAnsweredQuestions) / tempQuestions
      setFiability(calcFiability < 33 ? 'faible' : calcFiability < 66 ? 'moyen' : 'forte')
      
      setIsLoading(false)
    }
    setData()
  }, [])
  
  const getAnsweredQuestions = async() => {
    // Get all answered question of the user
    let toReturn
    
    await fetch(`${URL}/questions?hasAnswer=true`, { headers: { 'authorization': `Bearer ${token}` }})
    .then(res => res.json())
    .then(res => {
      if (res.status === 200) {
        setAnsweredQuestions(res.questions.length)
        toReturn = res.questions.length
      }
    })
    return toReturn
  }
  const getTotalQuestions = async() => {
    // Get the length of all questions
    let toReturn
    
    await fetch(`${URL}/questions`, { headers: { 'authorization': `Bearer ${token}` }})
    .then(res => res.json())
    .then(res => {
      if (res.status === 200) {
        setTotalQuestions(res.questions.length)
        toReturn = res.questions.length
      }
    })
    return toReturn
  }

  if (isLoading) return( <div className='loading'>Chargement...</div> )
  
  return (
    <div className='results-fiability-container'>
      <p>Vous avez répondu à <span>{ answeredQuestions }</span> question{ answeredQuestions > 1 && 's'} sur <span>{ totalQuestions }</span></p>
      <p>Fiabilité des résultats : <span className={fiability}>{ fiability }</span></p>
    </div>
  )
}