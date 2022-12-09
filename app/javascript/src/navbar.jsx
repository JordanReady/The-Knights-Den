import React from "react";

import './navbar.scss';

const Navbar = (props) => {

    return (
    <React.Fragment>
            <nav className='nav' >
                <ul>
                    <li className="nav-link"><a href='/'>Play</a></li>
                    <li className="nav-link"><a href='/'>Learn</a></li>
                    <li className="nav-link"><a href="/">Stats</a></li>
                    <li className="nav-link"><a href='/'>Logout</a></li>
                </ul>
            </nav>
    </React.Fragment>
    )
}



    export default Navbar;
