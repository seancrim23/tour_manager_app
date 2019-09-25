import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../redux/actions/index';

const Logout = props => {

    const logoutHandler = (event) => {
        props.logUserOut();
    };

    return (
        <li>
            <Link onClick={logoutHandler} to="/">LOGOUT</Link>
        </li>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        logUserOut: () => dispatch(actions.logoutUser())
    };
};

export default connect(null, mapDispatchToProps)(Logout);