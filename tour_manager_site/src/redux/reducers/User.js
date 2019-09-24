import * as actionTypes from '../actionTypes';

const initialState = {
    loginError: null,
    loggedIn: false
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
        default:
            return state;
    }
}