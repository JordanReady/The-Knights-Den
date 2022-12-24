import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';

import './logout.scss';

function Logout() {

    return (
        <>
        <div className="logout">
            <Navbar />
            logout
        </div>
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Logout />,
        document.body.appendChild(document.createElement('div')),
    );
    }
);