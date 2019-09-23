import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Login.module.css';

const Login = props => {
    return (
        <form className={classes.Login}>
            <h2><u>Login</u></h2>
            <label htmlFor="username">
                <span>Username: </span><input type="text" name="username" required="true"/>
            </label>
            <label htmlFor="pass">
                <span>Password: </span><input type="password" name="pass" required="true" /> 
            </label>
            <label>
                <span>&nbsp;</span><input type="submit" value="Login" />
            </label>
            <p>No account? Click <Link to="/signup">HERE</Link> to signup!</p>
        </form>
    );
};

export default Login;