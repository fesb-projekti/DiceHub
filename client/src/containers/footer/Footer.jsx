import React from 'react';
import DHLogo from '../../assets/logo.png';
import './footer.css';

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={DHLogo} alt="gpt3_logo" />
        <p>Split, Ruđera Boškovića 32, <br /> All Rights Reserved</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Contact Us</h4>
        <p>Split, Ruđera Boškovića 32</p>
        <p>021-865-931</p>
        <p>info@dicehub.com</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2021 DH. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
