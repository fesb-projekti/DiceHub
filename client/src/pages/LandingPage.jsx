import { Footer, Possibility, WhatGPT3, Header } from '../containers';
import { Navbar, Feature } from '../components/';

import classes from "./LandingPage.module.css";

const App = () => (
  <div className={classes.app}>
    <div className={classes.gradient__bg}>
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
