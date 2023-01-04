import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./stats.scss";

function Stats() {
  return (
    <>
      <div className="stats">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 mx-auto my-4">
              <div className="stats-box p-4">
                <div className="row">
                  <div className="col-12">
                    <h2 className="mb-4 username shadow">Username</h2>
                  </div>
                  <div className="col-12 col-md-3">
                    <h3 className="stat-header">Games</h3>
                    <h3 className="stat-num">27</h3>
                  </div>
                  <div className="col-12 col-md-3">
                    <h3 className="stat-header">Wins</h3>
                    <h3 className="stat-num">19</h3>
                  </div>
                  <div className="col-12 col-md-3">
                    <h3 className="stat-header">Losses</h3>
                    <h3 className="stat-num">5</h3>
                  </div>
                  <div className="col-12 col-md-3">
                    <h3 className="stat-header">Draws</h3>
                    <h3 className="stat-num">3</h3>
                  </div>
                </div>
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
    <Stats />,
    document.body.appendChild(document.createElement("div"))
  );
});
