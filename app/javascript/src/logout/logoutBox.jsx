import React from "react";

import "./logout.scss";

class LogoutBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-8 my-4 message-border shadow">
        <div className="p-4 message">
          <h2 className="mb-4 header">Do you really want to logout?</h2>
          <button
            className="btn shadow"
            onClick={() => {
              this.props.handleClick();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default LogoutBox;
