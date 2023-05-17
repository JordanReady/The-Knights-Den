import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";
import { useEffect } from "react";

import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./login.scss";
import Logo from "../../images/knights-den-logo.png";
import LogoBlue from "../../images/knights-den-logo-blue.png";
import LogoRed from "../../images/knights-den-logo-red.png";
import LogoPurple from "../../images/knights-den-logo-purple.png";
import LogoGreen from "../../images/knights-den-logo-green.png";
import LoginWidget from "./loginWidget";
import SignUpWidget from "./signupWidget";

class Login extends React.Component {
  state = {
    colorTheme: "",
    email: "",
    password: "",
    username: "",
    error: "",
  };

  rotateColorTheme() {
    const colorThemes = ["", "green", "blue", "red", "purple", ""];
    const currentIndex = colorThemes.indexOf(this.state.colorTheme);
    const nextIndex = (currentIndex + 1) % colorThemes.length;
    this.setState({ colorTheme: colorThemes[nextIndex] });
  }

  renderLogo() {
    const { colorTheme } = this.state;
    let logoSrc = Logo;

    switch (colorTheme) {
      case "green":
        logoSrc = LogoGreen;
        break;
      case "blue":
        logoSrc = LogoBlue;
        break;
      case "red":
        logoSrc = LogoRed;
        break;
      case "purple":
        logoSrc = LogoPurple;
        break;
      default:
        logoSrc = Logo;
        break;
    }

    return <img src={logoSrc} alt="Logo" className="logo" />;
  }

  componentDidMount() {
    // Set up the timer to change the color theme every 5 seconds
    this.timerId = setInterval(() => {
      this.rotateColorTheme();
    }, 6000);
  }

  componentWillUnmount() {
    // Clean up the timer when the component unmounts
    clearInterval(this.timerId);
  }

  render() {
    const { email, password, username, colorTheme } = this.state;
    return (
      <div className={colorTheme}>
        <div className="login">
          <Navbar />
          <div className="container ">
            <div className="row">
              <div className="hero col-12 col-lg-8 mt-2">
                <div>
                  <div className="row">
                    <div className="logo-box col-12 mt-2">
                      {this.renderLogo()}
                      <h1 className="logo-text">The Knights Den</h1>
                    </div>
                  </div>
                  <h3 className="hero-text">
                    Welcome to The Knights Den, where you can become the chess
                    champion you've always dreamed of becoming! With the
                    easy-to-use interface, you'll be able to jump right into a
                    lesson or game and start learning or playing chess right
                    away! And the comprehensive tutorial? It's like having your
                    own personal chess coach without all the awkward small talk.
                    But wait, there's more! Our bot is programmed to beat even
                    the most experienced players, so good luck with that. Or, if
                    you're feeling lucky, challenge your friends to see who is
                    the true chess master. And if you haven't noticed by now, we
                    have a variety of themes to chose from! Click on the theme
                    dropdown after you login to add some color to your chess
                    journey! So what are you waiting for? Sign up or login now
                    and join The Knights Den, where we promise to complicate
                    your life in the best way possible... Chess!
                  </h3>
                </div>
                <div className="chess-img"></div>
              </div>
              <div className="col-12 col-lg-4 mt-2 login-signup-box">
                <LoginWidget />
                <SignUpWidget />
              </div>
            </div>
          </div>
          <footer>
            <div className="row">
              <div className="col-12">
                <p>
                  Interested in learning more about the development proccess of
                  The Knights Den?
                  <br />
                  Check out my github repo <span> </span>
                  <a
                    href="https://github.com/JordanReady/The-Knights-Den"
                    target="blank"
                  >
                    here!
                  </a>
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Login />,
    document.body.appendChild(document.createElement("div"))
  );
});
