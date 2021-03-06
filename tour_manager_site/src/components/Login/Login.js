import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './Login.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const Login = props => {
    
    const loginHandler = (event) => {
        event.preventDefault();
        const data = {
            username: event.target.childNodes[1].childNodes[1].value,
            password: event.target.childNodes[2].childNodes[1].value
        };
        props.appLogin(data);
    };

    return (
        <form onSubmit={loginHandler} className={classes.Login}>
            <h2><u>Login</u></h2>
            <label htmlFor="username">
                <span>Username: </span><input type="email" name="username" placeholder={"username@email.com"} />
            </label>
            <label htmlFor="pass">
                <span>Password: </span><input type="password" name="pass" /> 
            </label>
            <label>
                <span>&nbsp;</span><input type="submit" value="Login" disabled={false} />
            </label>
            <p>{props.loginErrorMessage}</p>
            <p>No account? Click <Link to="/signup">HERE</Link> to signup!</p>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        loginErrorMessage: state.user.loginError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        appLogin: (data) => dispatch(actions.loginUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);