import React from 'react';
import possibilityImage from '../../assets/front.png';
import './possibility.css';

const Possibility = () => (
  <div className="gpt3__possibility section__padding" id="possibility">
    <div className="gpt3__possibility-image">
      <img src={possibilityImage} alt="possibility" />
    </div>
    <div className="gpt3__possibility-content">
      <h1 className="gradient__text">The possibilities are <br /> beyond your imagination</h1>
      <p>Do not worry about not being able to find new sessions. That is not possible within DiceHub. </p>
      <p> Read reviews, communicate with others, explore the Community.</p>
      <p> Be a part of DiceHub. Feel free to join at any moment. </p>
      <p>We aim to build and grow strong foundation for the future lovers and players of board games. Rise with us.</p>
    </div>
  </div>
);

export default Possibility;
