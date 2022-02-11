import React, { useState } from "react";
import "../../styles/ranking.css";
import RankingList from "../ranking/RankingList";

export default function Ranking() {
  return (
    <div className="main-component">
      <div className="jobs-title-main-component">
        <h1> Classement </h1>
        <hr></hr>
      </div>
      <RankingList />
    </div>
  );
}
