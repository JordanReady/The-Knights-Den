import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./logout.scss";
import LogoutBox from "./logoutBox";

function Logout() {
  const colorTheme = "blue";

  function logout() {
    console.log("logout");
  }

  return (
    <div className={colorTheme}>
      <div className="logout">
        <Navbar />
        <LogoutBox logout={logout} />
      </div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Logout />,
    document.body.appendChild(document.createElement("div"))
  );
});
