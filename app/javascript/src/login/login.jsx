import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./login.scss";

function Login() {
  const colorTheme = "default";

  function login() {
    console.log("Login");
  }

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
              <div className="form-box">
                <h4>Login</h4>
                <form className="login-form">
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={login}
                  >
                    Submit
                  </button>
                  <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                  </p>
                </form>
              </div>
              <div className="form-box mt-2 mb-2">
                <h4>Sign up</h4>
                <form className="login-form">
                  <div className="form-group">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="form-group">
                    <label>Username</label>
                    <input
                      type="username"
                      className="form-control"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter password"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    onClick={login}
                  >
                    Submit
                  </button>
                  <p className="forgot-password text-right"></p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Login />,
    document.body.appendChild(document.createElement("div"))
  );
});
