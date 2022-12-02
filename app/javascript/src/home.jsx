import React from "react";
import ReactDOM from "react-dom";
import Layout from "./navbar";

import './home.scss';

class Home extends React.Component {

    componentDidMount() {
        console.log("Hello World from React");
    }




  render() {
    return (
      <div className="home">
        <Layout />
        <h1>Home</h1>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
    ReactDOM.render(
        <Home />,
        document.body.appendChild(document.createElement("div"))
    );
    }
);
