import * as actionTypes from '../actionTypes';
import axios from 'axios';

export function loginUser(username, password){
    return dispatch => {
        dispatch(userLoggingIn());
        axios({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                username,
                password
            },
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
    setTimeout(() => {
        logoutUser();
    }, response.data.expTime);
    localStorage.setItem('auth', response.data.token);
    return { type: actionTypes.APP_LOGIN_SUCCESS };
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