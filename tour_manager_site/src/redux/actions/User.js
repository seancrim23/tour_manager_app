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
            console.log(response);
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
    //write some code to begin the countdown to user logout after expiration
    //also save the token to the local storage
    return { type: actionTypes.APP_LOGIN_SUCCESS };
};

function loginUserFail(error){
    return { type: actionTypes.APP_LOGIN_FAIL, error };
};