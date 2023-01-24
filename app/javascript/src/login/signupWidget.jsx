import React from "react";
import { ReactDOM } from "react";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

import "./login.scss";

class SignUpWidget extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
    error: "",
  };

  handleChange = (e) => {
    let type = e.target.type;
    if (type === "text") {
      this.setState({
        username: e.target.value,
      });
    } else {
      this.setState({
        [e.target.type]: e.target.value,
      });
    }
    console.log(this.state);
  };

  signup = (e) => {
    e.preventDefault();
    fetch(
      "/api/users",
      safeCredentials({
        method: "POST",
        body: JSON.stringify({
          user: {
            email: this.state.email,
            password: this.state.password,
            username: this.state.username,
          },
        }),
      })
    )
      .then(handleErrors)
      .then((data) => {
        this.login(data);
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  };

  login = (e) => {
    e.preventDefault();
    console.log("login fetch");
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
    const { email, password, username } = this.state;
    return (
      <div className="form-box mt-2 mb-2">
        <h4>Sign up</h4>
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
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter username"
              value={username}
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
            onClick={this.signup}
          >
            Submit
          </button>
          <p className="forgot-password text-right"></p>
        </form>
      </div>
    );
  }
}

export default SignUpWidget;
