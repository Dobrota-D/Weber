import React from "react";

import "../../styles/jobs.css";
import JobsList from "../job/JobsList.js";

export default function Jobs() {
  return (
    <div className="main-component">
      <div className="jobs-title-main-component">
        <h1> Fiches Métiers </h1>
        <hr></hr>
      </div>
      <JobsList />
    </div>
  );
}
