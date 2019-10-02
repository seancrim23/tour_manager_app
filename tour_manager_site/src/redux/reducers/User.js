import * as actionTypes from '../actionTypes';

const initialState = {
    loginError: null,
    loggedIn: false,
    loggedInType: null,
    logoutError: null,
    signupError: null
};

export default function userReducer(state = initialState, action) {
    switch(action.type){
        case actionTypes.APP_LOGIN:
            return {
                ...state,
                loginError: null,
                loggedIn: false
            };
        case actionTypes.APP_LOGIN_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loggedInType: action.userType
            };
        case actionTypes.APP_LOGIN_FAIL:
            return {
                ...state,
                loginError: action.error
            };
        case actionTypes.APP_LOGOUT:
            return {
                ...state,
                logoutError: null,
                loggedInType: null
            };
        case actionTypes.APP_LOGOUT_SUCCESS:
            return {
                ...state,
                loggedIn: false
            };
        case actionTypes.APP_LOGOUT_FAIL:
            return {
                ...state,
                logoutError: action.error
            };
        case actionTypes.APP_SIGNUP:
            return {
                ...state,
                loggedInType: null,
                loggedIn: false,
                signupError: null
            };
        case actionTypes.APP_SIGNUP_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loggedInType: action.userType
            };
        case actionTypes.APP_SIGNUP_FAIL:
            return {
                ...state,
                signupError: action.error
            };
        default:
            return state;
    }
}