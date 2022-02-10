import React from "react";
import { Link } from "react-router-dom";

import Home from "../assets/svg/Home";
import File from "../assets/svg/File";
import Help from "../assets/svg/Help";

import "../styles/menu.css";
import Podium from "../assets/svg/Podium";

export default function Menu() {
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
      </div>

      <div className="bottom">
        <Link to="/about">
          <Help />
          Comment ça marche
        </Link>
      </div>
    </div>
  );
}
