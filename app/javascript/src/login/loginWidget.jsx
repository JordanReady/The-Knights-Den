import React from "react";
import { ReactDOM } from "react";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

import "./login.scss";

class LoginWidget extends React.Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.type]: e.target.value,
    });
    console.log(this.state);
  };

  login = (e) => {
    e.preventDefault();
    fetch(
      "/api/sessions",
      safeCredentials({
        method: "POST",
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
          },
        }),
      })
    )
      .then(handleErrors)
      .then((data) => {
        if (data.success) {
          const params = new URLSearchParams(window.location.search);
          const redirect = params.get("redirect") || "/";
          window.location.href = redirect;
        }
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <div className="form-box">
        <h4>Login</h4>
        <form className="login-form">
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={this.handleChange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-block"
            onClick={this.login}
          >
            Submit
          </button>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </form>
      </div>
    );
  }
}

export default LoginWidget;
