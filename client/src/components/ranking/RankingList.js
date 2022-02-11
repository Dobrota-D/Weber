import React from "react";
import RankingCard from "./RankingCard";

export default function RankingList() {
  let list = [
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
    {
      name: "Développeur Front-End",
      percentage: Math.floor(Math.random() * 101),
    },
  ];
  list = rankings(list);
  function rankings(arr) {
    var sorted = arr.slice().sort(function (a, b) {
      return b.percentage - a.percentage;
    });
    var ranks = arr.map(function (v) {
      return sorted.indexOf(v) + 1;
    });
    let index = 0;
    while (index < arr.length) {
      arr[index]["position"] = ranks[index];
      index++;
    }
    arr.sort(function (a, b) {
      return a.position - b.position;
    });
    return arr;
  }
  return (
    <div className="ranking-global-container">
      {list.length > 0 ? (
        list.map((job, index) => {
          return <RankingCard data={job} key={index} />;
        })
      ) : (
        <div className="loading">Aucun métier trouvé</div>
      )}
    </div>
  );
}
