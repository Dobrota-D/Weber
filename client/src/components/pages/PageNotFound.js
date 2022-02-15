import React from 'react';
import { useLocation, Link } from 'react-router-dom'

import '../../styles/pageNotFound.css'

export default function PageNotFound() {
  const locaction = useLocation()
  
  return <div className='fullscreen-component page-not-found-component'>
    <div className="logo">
      <h1>Weber</h1>
      <span className="card"></span>
      <span className="card"></span>
    </div>
    
    <p>La page <span>'{locaction.pathname.slice(1)}'</span> n'existe pas...</p>
    <Link to='/'>Revenir à l'accueil</Link>
  </div>;
}
