import React from 'react';
import Feature from '../../components/feature/Feature';
import './whatGPT3.css';

const WhatGPT3 = () => (
  <div className="gpt3__whatgpt3 section__margin" id="dicehub">
    <div className="gpt3__whatgpt3-feature">
      <Feature title="What is DiceHub" />
    </div>
    <div className="gpt3__whatgpt3-heading">
      <h1 className="gradient__text">The possibilities are beyond your imagination</h1>
    </div>
    <div className="gpt3__whatgpt3-container">
      <Feature title="Friends" text="Make new friendships and allies. Connect with people all around the world. Find old companions." />
      <Feature title="Locations" text="Offer a place for a session or find it for yourself and your team! Explore the world!" />
      <Feature title="Games" text="Buy it. Sell it. Trade it. Review, vote and have fun!" />
    </div>
  </div>
);

export default WhatGPT3;
