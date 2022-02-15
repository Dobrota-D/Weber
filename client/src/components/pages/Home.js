import React from "react";
import ContainerCard from "../Home/ContainerCard";
import "../../styles/home.css";

export default function Home(props) {
  
  
  const like = () => {
    sendAnswer('yes')
  }
  const jsp = () => {
    sendAnswer(null)    
  }
  const dislike = () => {
    sendAnswer('no')
  }
  return (
    <div className="main-component">
      <button onClick={like}>Like</button>
      <button onClick={jsp}>jsp</button>
      <button onClick={dislike}>Dislike</button>
      <ContainerCard />
    </div>
  );
}

function sendAnswer(answer) {
  // Post the user's answer to the server
  const URL = process.env.REACT_APP_BACKEND_URL
  const token = localStorage.getItem('token')
  
  const questionId = 2
  
  fetch(
    `${URL}/questions/answer`,
    {
      method: 'POST',
      headers: { 'authorization': `Bearer ${token}` },
      body: JSON.stringify({ questionId, answer })
    }
  )
  .then(res => res.json())
  .then(res => {
    console.log(res);
  })
}