import React, { useState } from "react";
import "../../styles/ranking.css";

import RankingList from "../ranking/RankingList";
import ResultsFiability from "../ranking/ResultsFiability";

export default function Ranking() {
  
  
  return (
    <div className="main-component ranking-component">
      <div className="jobs-title-main-component">
        <h1> Classement </h1>
        <hr></hr>
      </div>
      <ResultsFiability />
      <RankingList />
    </div>
  );
}
