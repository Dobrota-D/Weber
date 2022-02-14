import React from 'react'
import Cross from "../../assets/svg/Cross";
import Heart from "../../assets/svg/Heart";
import Idk from "../../assets/svg/Idk";
import TinderCard from "react-tinder-card";

export default function Swipe() {
  
    const onSwipe = (direction) => {
      console.log('You swiped: ' + direction)
    }
    
    const onCardLeftScreen = (myIdentifier) => {
      console.log(myIdentifier + ' left the screen')
    }
    
    return (
      <div>
    <TinderCard className='question-card' onSwipe={onSwipe} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>Hello, World!</TinderCard>
      <div className="button-container">
      <div className="dislike-button">
        <Cross/>
      </div>
      <div className="idk-button">
        <Idk/>
      </div>
      
      <div className="like-button">
        <Heart/>
      </div>
      </div>
      </div>
    )
}    

