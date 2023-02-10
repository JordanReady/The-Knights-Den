import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import GameForm from "./gameForm";
import { handleErrors } from "../utils/fetchHelper";

function Index() {
  const [colorTheme, setColorTheme] = useState("default");
  const [user_id, setUserId] = useState(undefined);

  useEffect(() => {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        setUserId(data.user_id);
        return fetch(`/api/users/${data.user_id}/color_theme`);
      })
      .then(handleErrors)
      .then((data) => {
        setColorTheme(data.color_theme);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className={colorTheme}>
      <Navbar />
      <GameForm user_id={user_id} />
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement("div"))
  );
});
