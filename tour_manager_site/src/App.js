import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GenericSearch from './containers/GenericSearch/GenericSearch';
import BandInterface from './containers/BandInterface/BandInterface';
import classes from './App.module.css'
import { connect } from 'react-redux';
import history from './utils/history';
import * as actions from './redux/actions/index';

const App = props =>{

  const loginSignupRoutes = props.loggedIntoApp ? null : <React.Fragment>
                                                            <Route exact path="/login" component={Login} />
                                                            <Route exact path="/signup" component={Signup} />
                                                          </React.Fragment>;

  return (
    <Router history={history}>
      <div className={classes.App}>
        <Navbar />
          <Route exact path ="/"/>
          {loginSignupRoutes}
        <Footer />
      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {
    loggedIntoApp: state.user.loggedIn
  };
};

export default connect(mapStateToProps)(App);
