import React from 'react';

import { Footer, Possibility, WhatGPT3, Header } from '../containers';
import { Navbar, Feature } from '../components/';

import './LandingPage.module.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <WhatGPT3 />
    <Feature />
    <Possibility />
    <Footer />
  </div>
);

export default App;
