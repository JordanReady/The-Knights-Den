import React from "react";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

import "./logout.scss";

class LogoutBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: null,
      error: "",
    };
  }

  componentDidMount() {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        this.setState({
          authenticated: data.authenticated,
          user_id: data.user_id,
        });
      });
  }

  handleLogout = () => {
    console.log("user_id", this.state.user_id);
    fetch(
      `/api/sessions/${this.state.user_id}`,
      safeCredentials({ method: "DELETE" })
    )
      .then(handleErrors)
      .then((data) => {
        if (data.success) {
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        this.setState({
          error: error.message,
        });
      });
  };

  render() {
    return (
      <div className="viewport">
        <div className="container my-5 message-border shadow">
          <div className="row">
            <div className="col-12">
              <div className="p-4 message">
                <h2 className="mb-4 header">Do you really want to logout?</h2>
                <button
                  className="btn shadow"
                  onClick={() => {
                    this.handleLogout();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogoutBox;
