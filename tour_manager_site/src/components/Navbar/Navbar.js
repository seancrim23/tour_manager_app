import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logout from '../Logout/Logout';

const Navbar = props => {

    const userLoginOrLogout = props.loggedIntoApp ? <Logout /> : <li><Link to="/login">LOGIN</Link></li>;

    return (
        <ul className={classes.Navbar}>
            <li className={classes.HomeLogo}><Link to="/">HOME</Link></li>
            {userLoginOrLogout}
        </ul>
    );
};

const mapStateToProps = state => {
    return {
        loggedIntoApp: state.user.loggedIn
    };
};

export default connect(mapStateToProps)(Navbar);