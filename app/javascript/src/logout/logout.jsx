import React from "react";
import Navbar from "../navbar";

import './logout.scss';

class Logout extends React.Component {


    render() {
        return (
            <div className="logout">
                <Navbar />
                <h1>Logout</h1>
            </div>
        );
    }
}

export default Logout;