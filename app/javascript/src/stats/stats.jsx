import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/css/bootstrap.min.css';

import './stats.scss';



function Stats() {

    return (
        <>
        <div className="stats">
            <Navbar />
            stats
        </div>
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Stats />,
        document.body.appendChild(document.createElement('div')),
    );
    }
);