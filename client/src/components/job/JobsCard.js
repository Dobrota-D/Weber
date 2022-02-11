import React, { useState } from "react";
import Plus from "../../assets/svg/Plus";

export default function JobsCard(props) {
  const [areDetailsOpen, setAreDetailsOpen] = useState(false);
  function openDetails() {
    setAreDetailsOpen(true);
  }
  function closeDetails() {
    setAreDetailsOpen(false);
  }

  const job = props.data;

  let content = job.content.replaceAll("\\n", "\n");

  return (
    <div
      className={`jobs-card ${areDetailsOpen ? "details" : ""}`}
      data-id={job.id}
    >
      <p className="jobs-title">{job.title}</p>
      {areDetailsOpen && (
        <div
          className="closeBtn"
          onClick={() => {
            closeDetails();
          }}
        >
          <Plus />
        </div>
      )}
      <hr></hr>
      <div className="jobs-content">
        {areDetailsOpen && (
          <img
            className="jobs-content-image"
            src="https://picsum.photos/200"
            alt="jobImg"
          ></img>
        )}
        <p>{content}</p>
      </div>

      {!areDetailsOpen && (
        <button className="jobs-details" onClick={() => openDetails()}>
          <Plus /> Plus d'infos
        </button>
      )}
    </div>
  );
}
