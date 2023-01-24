import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./login.scss";
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signupWidget";

class Login extends React.Component {
  state = {
    colorTheme: "",
    email: "",
    password: "",
    username: "",
    error: "",
  };

  render() {
    const { email, password, username, colorTheme } = this.state;
    return (
      <div className={colorTheme}>
        <div className="login">
          <Navbar />
          <div className="container ">
            <div className="row">
              <div className="hero col-12 col-lg-8 mt-2">
                <div>
                  <h3 className="hero-text">
                    Welcome to My Chess App! With our easy-to-use interface and
                    comprehensive tutorial, you'll be able to learn the complex
                    game of chess and improve your strategy in no time. Play
                    against a bot or challenge your friends to see who the true
                    chess master is. Sign up now and track your progress as you
                    climb to the top of the leaderboard!
                  </h3>
                </div>
                <div className="chess-img"></div>
              </div>
              <div className="col-12 col-lg-4 mt-2">
                <LoginWidget />
                <SignUpWidget />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Login />,
    document.body.appendChild(document.createElement("div"))
  );
});
