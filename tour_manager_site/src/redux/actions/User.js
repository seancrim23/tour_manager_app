import * as actionTypes from '../actionTypes';
import axios from 'axios';
import history from '../../utils/history';

export function loginUser(data){
    return dispatch => {
        dispatch(userLoggingIn());
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data,
            url: 'http://localhost:3030/user/login'
        })
        .then(response => {
            dispatch(loginUserSuccess(response));
        })
        .catch(error => {
            dispatch(loginUserFail(error.response.data.error));
        });
    };
};

function userLoggingIn(){
    return { type: actionTypes.APP_LOGIN };
};

function loginUserSuccess(response){
    //we will need to pass the user in some way to this.....when a user logs in we need some key to pull all of the user data and populate the resulting view
    setTimeout(() => {
        logoutUser();
    }, response.data.expTime);
    localStorage.setItem('auth', response.data.token);
    history.push('/');
    return { type: actionTypes.APP_LOGIN_SUCCESS, userType: response.data.user.type };
};

function loginUserFail(error){
    return { type: actionTypes.APP_LOGIN_FAIL, error };
};

export function logoutUser(){
    return dispatch => {
        dispatch(userLoggingOut());
        axios({
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth')}`
            },
            url: 'http://localhost:3030/user/logout'
        })
        .then(response => {
            console.log(response);
            dispatch(userLogoutSuccess());
        })
        .catch(error => {
            dispatch(userLogoutFail(error.response.data.error));
        });
    };
}

function userLoggingOut(){
    return { type: actionTypes.APP_LOGOUT };
};

function userLogoutSuccess(response){
    //remove token from local storage
    localStorage.removeItem('auth');
    return { type: actionTypes.APP_LOGOUT_SUCCESS };
};

function userLogoutFail(error){
    return { type: actionTypes.APP_LOGOUT_FAIL, error };
};

export function signupUser(data){
    return dispatch => {
        dispatch(userSigningUp());
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data,
            url: 'http://localhost:3030/user/signup'
        })
        .then(response => {
            console.log(response);
            dispatch(userSignupSuccess(response));
        })
        .catch(error => {
            console.log(error.response.data.error);
            dispatch(userSignupFail(error.response.data.error));
        });
    };
}

function userSigningUp(){
    return { type: actionTypes.APP_SIGNUP };
};

function userSignupSuccess(response){
    //we'll need to use this success to pull the user....
    //when they sign up we should show the home page initialized with what they signed up with
    setTimeout(() => {
        logoutUser();
    }, response.data.expTime);
    localStorage.setItem('auth', response.data.token);
    history.push('/');
    return { type: actionTypes.APP_SIGNUP_SUCCESS, userType: response.data.user.type };
};

function userSignupFail(error){
    return { type: actionTypes.APP_SIGNUP_FAIL, error };
};