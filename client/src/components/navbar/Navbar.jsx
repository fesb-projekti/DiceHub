import React, { useState, Component } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { format } from 'util';
import DHLogo from '../../assets/logo.png';
import './navbar.css';
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import welcomeMessage from "../../pages/welcomeMessage";
import { BrowserRouter as Router, Route, NavLink} from "react-router-dom";



const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="gpt3__navbar">
      <div className="gpt3__navbar-links">
        <div className="gpt3__navbar-links_logo">
          <img src={DHLogo} />
        </div>
        <div className="gpt3__navbar-links_container">
          <p><a href="#home">Home</a></p>
          <p><a href="#dicehub">DiceHub?</a></p>
          <p><a href="#possibility">Our Aim</a></p>
        </div>
      </div>
      <div className="gpt3__navbar-sign">
      <button type="button">Sign In</button><p/>
        <button type="button">Sign up</button>
      </div>
      <div className="gpt3__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="gpt3__navbar-menu_container scale-up-center">
          <div className="gpt3__navbar-menu_container-links">
            <p><a href="#home">Home</a></p>
            <p><a href="#dicehub">DiceHub?</a></p>
            <p><a href="#possibility">Our Aim</a></p>
          </div>
          <div className="gpt3__navbar-menu_container-links-sign">
          <button type="button">Sign In</button><p/>
          <button type="button">Sign up</button>            
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
