import React from "react";
import { handleErrors } from "../utils/fetchHelper";

import "./navbar.scss";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: "",
      error: "",
      colorTheme: "default",
    };
  }

  componentDidMount() {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        this.setState({
          user: data.user,
          authenticated: data.authenticated,
        });
      });
  }

  render() {
    return (
      <div className={this.colorTheme}>
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
            {this.state.authenticated ? (
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
