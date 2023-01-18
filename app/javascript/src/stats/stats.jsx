import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./stats.scss";
import StatsBox from "./statsBox";

function Stats() {
  const colorTheme = "purple";

  return (
    <div className={colorTheme}>
      <div className="stats">
        <Navbar />
        <div className="container">
          <div className="row">
            <div className="col-12 my-4">
              <StatsBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Stats />,
    document.body.appendChild(document.createElement("div"))
  );
});
