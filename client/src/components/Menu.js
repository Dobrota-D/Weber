import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Home from "../assets/svg/Home";
import File from "../assets/svg/File";
import Help from "../assets/svg/Help";
import Lock from "../assets/svg/Lock";
import Podium from "../assets/svg/Podium";
import Logout from "../assets/svg/Logout";
import Refresh from "../assets/svg/Refresh";

import "../styles/menu.css";

export default function Menu(props) {
  const [showRefreshResultsPopup, setShowRefreshResultsPopup] = useState(false)
  
  const refreshResults = () => {
    // Refresh the results of the user
    setShowRefreshResultsPopup(true)
  }
  
  return (
    <div className="menu">
      <div className="logo">
        <h1>Weber</h1>
        <span className="card"></span>
        <span className="card"></span>
      </div>

      <div className="links">
        <Link to="/">
          <Home />
          Accueil
        </Link>
        <Link to="/jobs">
          <File />
          Fiches métiers
        </Link>
        <Link to="/ranking">
          <Podium />
          Classement
        </Link>
        { props.isAdmin &&
          <Link to="/admin">
            <Lock />
            Administration
          </Link>
        }
      </div>

      <div className="bottom">
        <Link to="/about">
          <Help />
          Comment ça marche
        </Link>
        <p onClick={refreshResults}>
          <Refresh />
          Réinitialiser mes résultats
        </p>
        <Link to="/login" onClick={() => localStorage.clear()}>
          <Logout />
          Déconnexion
        </Link>
      </div>
      
      { showRefreshResultsPopup && <RefreshResultsPopup hidePopup={() => setShowRefreshResultsPopup(false)} /> }
      
    </div>
  );
}

export function RefreshResultsPopup(props) {
  // Refresh results confirmation popup
  const URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem("token");
  const navigate = useNavigate()
  
  const refreshResults = async() => {
    fetch(`${URL}/users/reset`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
    })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 200) {
        navigate('/')
        window.location.reload(false);
      }
    })
  }
  
  return(
    <div className="refresh-results-popup-container">
      <div className="refresh-results-popup">
        <p>Êtes-vous sûr de vouloir réinitialiser vos résultats ? Cette action effacera vos scores et vos réponses.</p>
        <div>
          <button onClick={refreshResults}>Réinitialiser</button>
          <button onClick={() => props.hidePopup()}>Annuler</button>
        </div>
      </div>
    </div>
  )
}