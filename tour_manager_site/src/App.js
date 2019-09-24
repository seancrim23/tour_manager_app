import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GenericSearch from './containers/GenericSearch/GenericSearch';
import BandInterface from './containers/BandInterface/BandInterface';
import classes from './App.module.css'
import { connect } from 'react-redux';
import * as actions from './redux/actions/index';

const App = props =>{

  const loginHandler = (event) => {
    event.preventDefault();
    const username = event.target.childNodes[1].childNodes[1].value;
    const pass = event.target.childNodes[2].childNodes[1].value;
    props.appLogin(username, pass);
  }

  const loggedIn = props.loggedIntoApp ? <p>logged in :)</p> : <p>logged out :(</p>;

  return (
    <Router>
      <div className={classes.App}>
        <Navbar />
          {loggedIn}
          <Route exact path ="/"/>
          <Route exact path="/login" render={() => <Login submitLogin={loginHandler} />} />
          <Route exact path="/signup" component={Signup} />
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

const mapDispatchToProps = dispatch => {
  return {
    appLogin: (uName, pass) => dispatch(actions.loginUser(uName, pass))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
