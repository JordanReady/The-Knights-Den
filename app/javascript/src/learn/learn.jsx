import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import { useState, useEffect } from "react";
import TheBoard from "../chessLessons/TheBoard";
import PlacingPieces from "../chessLessons/PlacingPieces";
import LearnNavbar from "./learnNavbar";
import BasicRules from "../chessLessons/BasicRules";
import ThePawn from "../chessLessons/ThePawn";
import TheKnight from "../chessLessons/TheKnight";
import TheBishop from "../chessLessons/TheBishop";
import TheRook from "../chessLessons/TheRook";
import TheQueen from "../chessLessons/TheQueen";
import TheKing from "../chessLessons/TheKing";
import OtherRules from "../chessLessons/OtherRules";
import ChessTerms from "../chessLessons/ChessTerms";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./learn.scss";
import ThemePicker from "../themePicker/themePicker";
import { handleErrors } from "../utils/fetchHelper";

function Learn() {
  const [colorTheme, setColorTheme] = useState("default");
  const [lesson, setLesson] = useState(1);
  const [currentLesson, setCurrentLesson] = useState(1);
  const [authenticated, setAuthenticated] = useState(false);
  const [user_id, setUserId] = useState(undefined);
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [fen, setFen] = useState("start");

  useEffect(() => {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        setAuthenticated(data.authenticated);
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

  useEffect(() => {
    function handleResize() {
      const display = document.getElementsByClassName("lesson")[0];
      if (display.clientWidth > 275) {
        setChessboardSize(275);
      } else if (display.clientWidth > 247) {
        setChessboardSize(display.clientWidth - 28);
      } else {
        setChessboardSize(display.clientWidth);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    getLesson();
    window.scrollTo(0, 0);
  }, [lesson]);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    setColorTheme(newColor);
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/api/users/${user_id}/color_theme`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        user: {
          color_theme: newColor,
        },
      }),
    })
      .then(handleErrors)
      .then((data) => {});
  };

  function getLesson() {
    switch (lesson) {
      case 0:
        return <ChessTerms changeLesson={changeLesson} />;
      case 1:
        return (
          <TheBoard
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 2:
        return (
          <PlacingPieces
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 3:
        return (
          <BasicRules
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 4:
        return (
          <ThePawn
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 5:
        return (
          <TheKnight
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 6:
        return (
          <TheBishop
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 7:
        return (
          <TheRook
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 8:
        return (
          <TheQueen
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 9:
        return (
          <TheKing
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
      case 10:
        return (
          <OtherRules
            changeLesson={changeLesson}
            colorTheme={colorTheme}
            boardWidth={chessboardSize}
            fen={fen}
            setFen={setFen}
          />
        );
    }
  }

  function changeLesson(les) {
    setLesson(les);
  }

  function handleTerms(e) {
    e.preventDefault();
    changeLesson(0);
  }

  function handleBack(e) {
    e.preventDefault();
    setLesson(currentLesson);
  }

  function handleNext(e) {
    e.preventDefault();
    let les = lesson + 1;

    setLesson(les);
    setCurrentLesson(les);
  }

  function handlePrev(e) {
    e.preventDefault();
    let les = lesson - 1;

    setLesson(les);
    setCurrentLesson(les);
  }

  return (
    <div className={colorTheme}>
      <div className="learn">
        <Navbar colorTheme={colorTheme} authenticated={authenticated} />
        <LearnNavbar
          lesson={lesson}
          setLesson={setLesson}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
        />
        <div className="lesson">{getLesson()}</div>
        {lesson > 0 ? (
          <div className="lesson-btn-row">
            <button className="theme-btn">
              <ThemePicker
                colorTheme={colorTheme}
                setColorTheme={setColorTheme}
                handleColorChange={handleColorChange}
                style="learn-style"
              />
            </button>
            <button id="0" className="lesson-btn" onClick={handleTerms}>
              Terms
            </button>
            {lesson === 1 ? (
              <button className="lesson-btn prev-btn disabled">Prev</button>
            ) : (
              <button className="lesson-btn prev-btn" onClick={handlePrev}>
                Prev
              </button>
            )}
            {lesson === 10 ? (
              <button className="lesson-btn next-btn disabled">Next</button>
            ) : (
              <button className="lesson-btn next-btn" onClick={handleNext}>
                Next
              </button>
            )}
          </div>
        ) : (
          <div className="lesson-btn-row">
            <button id="0" className="lesson-btn back-btn" onClick={handleBack}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Learn />,
    document.body.appendChild(document.createElement("div"))
  );
});
