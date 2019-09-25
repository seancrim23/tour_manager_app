import * as actionTypes from '../actionTypes';

const initialState = {
    loginError: null,
    loggedIn: false,
    loggedInType: null,
    logoutError: null
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
                loggedIn: true
            };
        case actionTypes.APP_LOGIN_FAIL:
            return {
                ...state,
                loginError: action.error
            };
        case actionTypes.APP_LOGOUT:
            return {
                ...state,
                logoutError: null
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
        default:
            return state;
    }
}