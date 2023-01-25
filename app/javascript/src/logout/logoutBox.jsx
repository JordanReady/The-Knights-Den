import React from "react";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

import "./logout.scss";

class LogoutBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: "",
    };
  }

  handleLogout = () => {
    const id = document.querySelector("meta[name='user-id']").content;
    fetch(`/api/sessions`, safeCredentials({ method: "DELETE" }))
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
