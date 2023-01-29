import React from "react";

import "./navbar.scss";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.colorTheme}>
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
            {this.props.authenticated ? (
              <a className="nav-link" href="/logout">
                Logout
              </a>
            ) : (
              <a className="nav-link" href="/login">
                Login
              </a>
            )}
          </li>
        </ul>
      </div>
    );
  }
}

export default Navbar;
