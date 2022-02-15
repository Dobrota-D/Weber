import React from "react";
import { Link } from "react-router-dom";

import Home from "../assets/svg/Home";
import File from "../assets/svg/File";
import Help from "../assets/svg/Help";
import Lock from "../assets/svg/Lock";
import Logout from "../assets/svg/Logout";

import "../styles/menu.css";
import Podium from "../assets/svg/Podium";

export default function Menu(props) {
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
        <Link to="/login" onClick={() => localStorage.clear()}>
          <Logout />
          Déconnexion
        </Link>
      </div>
    </div>
  );
}
