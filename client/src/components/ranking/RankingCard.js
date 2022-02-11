import React, { useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ProgressProvider from "./ProgressProvider";

export default function RankingCard(props) {
  return (
    <div
      className={`ranking-card-global${
        props.data.position < 4 ? "-" + props.data.position : ""
      }`}
    >
      <div className="ranking-circle-progress">
        <ProgressProvider valueStart={0} valueEnd={props.data.percentage}>
          {(value) => <CircularProgressbar value={value} text={`${value}%`} />}
        </ProgressProvider>
      </div>
      <div className="ranking-name-job">{props.data.name}</div>
    </div>
  );
}
