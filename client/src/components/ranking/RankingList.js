import React, { useState, useEffect } from "react";
import RankingCard from "./RankingCard";

export default function RankingList() {
  const [list, setList] = useState()
  const [isLoading, setIsLoading] = useState(true)
  
  const URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  
  useEffect(() => {
    const getList = async() => {
      // Get all stats of the user
      fetch(`${URL}/users/stats`, { headers: { 'authorization': `Bearer ${token}` }})
      .then(res => res.json())
      .then(res => {
        if (res.status === 200) {
          setList(rankings(res.stats))
          setIsLoading(false)
        }
      })
    }
    getList()
  }, [URL, token])
  
  if (isLoading) return( <div className="loading">Chargement des données...</div> )
  
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