import React from 'react';
import classes from './Signup.module.css';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const Signup = props => {

//set up a password validation (two fields, compare both to validate that password is the same)
// also maybe make it so users have to add minimum one lower, one upper, one special character, etc
//figure out what else to put on signup
//implement signup handler (MAKE SURE SUCCESSFUL SIGNUP REDIRECTS TO PROPER COMPONENT HOMEPAGE band -> band, promoter -> promoter)
// add signupErrorMessage <p>{props.signupErrorMessage}</p>
    const signupHandler = event => {
        event.preventDefault();
        const data = {
            username: event.currentTarget[0].value,
            password: event.currentTarget[1].value,
            type: event.currentTarget[2].checked ? 'band' : 'promoter'
        }
        props.appSignup(data);
    };

    return (
        <form onSubmit={signupHandler} className={classes.Signup}>
            <h2><u>Signup</u></h2>
            <label htmlFor="username">
                <span>Username: </span><input type="email" name="username" placeholder={"username@email.com"} />
            </label>
            <label htmlFor="pass">
                <span>Password: </span><input type="password" name="pass" /> 
            </label>
            <label htmlFor="userType">
                <span>UserType: </span><input type="radio" name="userType" value="band"/> Band<input type="radio" name="userType" value="promoter"/> Promoter
            </label>
            <label>
                <span>&nbsp;</span><input type="submit" value="Signup" />
            </label>
            <p>{props.signUpErrorMessage}</p>
        </form>
    );
};

const mapStateToProps = state => {
    return {
        signUpErrorMessage: state.user.signupError
    };
};

const mapDispatchToProps = dispatch => {
    return {
        appSignup: (data) => dispatch(actions.signupUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);