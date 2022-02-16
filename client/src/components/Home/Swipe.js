import React, { useState } from "react";
import Cross from "../../assets/svg/Cross";
import Heart from "../../assets/svg/Heart";
import Idk from "../../assets/svg/Idk";
import TinderCard from "react-tinder-card";

export default function Swipe(props) {
  const [swipe, setSwipe] = useState(null);

  const [questions, setQuestions] = useState(props.questions);
  const swiped = (dir, type) => {
    setSwipe(null);
    if (!type) {
      if (dir === "right") {
        type = "yes";
      } else if (dir === "left") {
        type = "no";
      } else {
        type = null;
      }
    }
    sendAnswer(type, questions.length - 1);
    setQuestions((questions) => questions.slice(0, questions.length - 1));
  };

  const swiping = async (dir, type) => {
    setSwipe(dir);
    setTimeout(async () => {
      swiped(dir, type);
    }, 1000);
  };

  return (
    <div>
      <div>
        {questions.map((question, index) => {
          return (
            <TinderCard
              key={index}
              preventSwipe={["up"]}
              onSwipe={(dir) => swiped(dir)}
              className={`question-card ${
                index > questions.length - 4
                  ? "number" + (questions.length - index) + " "
                  : "other "
              }
                ${
                  index === questions.length - 1 && swipe != null
                    ? "swipe-" + swipe
                    : ""
                }
                
              `}
            >
              {question.title}
            </TinderCard>
          );
        })}
      </div>
      <div className="button-container">
        <div
          className="dislike-button"
          onClick={() => {
            swiping("left", "no");
          }}
        >
          <Cross />
        </div>
        <div
          className="idk-button"
          onClick={() => {
            swiping("down", null);
          }}
        >
          <Idk />
        </div>

        <div
          className="like-button"
          onClick={() => {
            swiping("right", "yes");
          }}
        >
          <Heart />
        </div>
      </div>
    </div>
  );
}

function sendAnswer(answer, id) {
  // Post the user's answer to the server
  const URL = process.env.REACT_APP_BACKEND_URL;
  const token = localStorage.getItem("token");

  const questionId = id;

  fetch(`${URL}/questions/answer`, {
    method: "POST",
    headers: { authorization: `Bearer ${token}` },
    body: JSON.stringify({ questionId, answer }),
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    });
}
