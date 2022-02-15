import React, { useState } from "react";
import Cross from "../../assets/svg/Cross";
import Heart from "../../assets/svg/Heart";
import Idk from "../../assets/svg/Idk";
import TinderCard from "react-tinder-card";

export default function Swipe() {
  const [swipe, setSwipe] = useState(null);

  const [questions, setQuestions] = useState([
    "Question 00",
    "Question 01",
    "Question 02",
    "Question 03",
    "Question 04",
    "Question 05",
    "Question 06",
    "Question 07",
  ]);

  const swiped = (dir) => {
    setSwipe(null);
    console.log(dir);
    setQuestions((questions) => questions.slice(0, questions.length - 1));
  };

  const swiping = async (dir) => {
    setSwipe(dir);
    setTimeout(() => {
      swiped();
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
              {question}
            </TinderCard>
          );
        })}
      </div>
      <div className="button-container">
        <div
          className="dislike-button"
          onClick={() => {
            swiping("left");
          }}
        >
          <Cross />
        </div>
        <div
          className="idk-button"
          onClick={() => {
            swiping("down");
          }}
        >
          <Idk />
        </div>

        <div
          className="like-button"
          onClick={() => {
            swiping("right");
          }}
        >
          <Heart />
        </div>
      </div>
    </div>
  );
}
