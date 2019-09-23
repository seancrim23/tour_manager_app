import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GenericSearch from './containers/GenericSearch/GenericSearch';
import BandInterface from './containers/BandInterface/BandInterface';
import classes from './App.module.css'

function App() {

  const loggedIn = true;
  const loginType = 'band';
  const content = loggedIn ? GenericSearch : BandInterface;

  return (
    <Router>
      <div className={classes.App}>
        <Navbar />
          <Route exact path ="/" component={content} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
