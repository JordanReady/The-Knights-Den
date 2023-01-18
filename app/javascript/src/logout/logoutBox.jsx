import React from "react";

import "./logout.scss";

class LogoutBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container my-5 message-border shadow">
        <div className="row">
          <div className="col-12">
            <div className="p-4 message">
              <h2 className="mb-4 header">Do you really want to logout?</h2>
              <button
                className="btn shadow"
                onClick={() => {
                  this.props.logout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LogoutBox;
