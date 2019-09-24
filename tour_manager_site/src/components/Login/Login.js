import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import classes from './Login.module.css';
import { connect } from 'react-redux';

const Login = props => {
    return (
        <form onSubmit={props.submitLogin} className={classes.Login}>
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

export default connect(mapStateToProps)(Login);