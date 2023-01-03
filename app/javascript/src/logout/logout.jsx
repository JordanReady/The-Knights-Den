import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./logout.scss";

function Logout() {
  function handleClick() {
    console.log("logout");
  }

  return (
    <>
      <div className="logout">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 col-lg-6 mx-auto my-4">
              <div className="message-border shadow p-4">
                <h2 className="mb-4 header">Do you really want to logout?</h2>
                <button
                  className="btn shadow"
                  onClick={() => {
                    handleClick();
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Logout />,
    document.body.appendChild(document.createElement("div"))
  );
});
