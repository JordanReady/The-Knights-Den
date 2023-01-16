import React from "react";

import "./navbar.scss";

function Navbar(props) {
  const { colorTheme } = props;
  return (
    <div className={colorTheme}>
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
    </div>
  );
}

export default Navbar;
