import React from 'react';
import classes from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = props => {
    return (
        <ul className={classes.Navbar}>
            <li className={classes.HomeLogo}><Link to="/">HOME</Link></li>
            <li><Link to="/login">LOGIN</Link></li>
        </ul>
    );
};

export default Navbar;