import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./stats.scss";
import StatsBox from "./statsBox";

function Stats() {
  return (
    <>
      <div className="stats">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-9 mx-auto my-4">
              <StatsBox />
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
