import React from 'react';
import logz from '../../assets/logz.png';
import './header.css';

const Header = () => (
  <div className="gpt3__header section__padding" id="home">
    <div className="gpt3__header-content">
      <h1 className="gradient__text">Let&apos;s create magical community, together.</h1>
      <p>Strange new world. Reach for it.</p>
    </div>

    <div className="gpt3__header-image">
      <img src={logz} alt="logo" />
    </div>
  </div>
);

export default Header;
