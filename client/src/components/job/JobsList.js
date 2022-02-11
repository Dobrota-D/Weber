import React, { useEffect, useState } from "react";
import JobsCard from "./JobsCard";

export default function JobsList() {
  const URL = process.env.REACT_APP_BACKEND_URL;
  const [isLoading, setIsLoading] = useState(true);
  const [jobs, setJobs] = useState();

  useEffect(() => {
    fetch(`${URL}/jobs`)
      .then((res) => res.json())
      .then((res) => {
        setJobs(res.jobs);
        setIsLoading(false);
      });
  }, [URL]);

  if (isLoading) return <div className="loading"> Chargement des métiers</div>;
  return (
    <div className="jobs-container">
      {jobs.length > 0 ? (
        jobs.map((job, index) => {
          return <JobsCard data={job} key={index} />;
        })
      ) : (
        <div className="loading">Aucun métier trouvé</div>
      )}
    </div>
  );
}
