import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./logout.scss";
import LogoutBox from "./logoutBox";
import { handleErrors } from "../utils/fetchHelper";

function Logout() {
  const [colorTheme, setColorTheme] = useState("default");
  const [authenticated, setAuthenticated] = useState(false);
  const [user_id, setUserId] = useState(undefined);

  useEffect(() => {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        setAuthenticated(data.authenticated);
        setUserId(data.user_id);
        return fetch(`/api/users/${data.user_id}/color_theme`);
      })
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        setColorTheme(data.color_theme);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={colorTheme}>
      <div className="logout">
        <Navbar />
        <div className="container">
          <LogoutBox />
        </div>
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
