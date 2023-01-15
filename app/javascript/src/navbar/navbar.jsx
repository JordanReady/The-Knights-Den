import React from "react";

import "./navbar.scss";

function Navbar() {
  return (
    <React.Fragment>
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/">
            Play
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/learn">
            Learn
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/stats">
            Stats
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/logout">
            Logout
          </a>
        </li>
      </ul>
    </React.Fragment>
  );
}

export default Navbar;
