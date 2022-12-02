import React from "react";

import './navbar.scss';

const Navbar = (props) => {

    return (
    <React.Fragment>
            <nav className='nav' >
                <a href='/' className="logo"> <img src='logo.png' alt='logo'/></a>
                <ul>
                    <li className="nav-link"><a href='/'>Create Builds</a></li>
                    <li className="nav-link"><a href='/'>My Builds</a></li>
                    <li className="nav-link"><a href='/'>Logout</a></li>
                </ul>
            </nav>
    </React.Fragment>
    )
}



    export default Navbar;
