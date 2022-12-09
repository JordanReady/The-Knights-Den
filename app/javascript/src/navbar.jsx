import React from "react";

import './navbar.scss';

const Navbar = (props) => {

    return (
    <React.Fragment>
            <nav className='nav' >
                <ul>
                    <li className="nav-link"><a href='/'>Play</a></li>
                    <li className="nav-link"><a href='/learn'>Learn</a></li>
                    <li className="nav-link"><a href="/stats">Stats</a></li>
                    <li className="nav-link"><a href='/logout'>Logout</a></li>
                </ul>
            </nav>
    </React.Fragment>
    )
}



    export default Navbar;
