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

function Learn(props) {
  const [colorTheme, setColorTheme] = useState("default");
  const [lesson, setLesson] = useState(1);
  const [currentLesson, setCurrentLesson] = useState(1);

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    console.log(newColor);
    setColorTheme(newColor);
  };

  useEffect(() => {
    getLesson();
    window.scrollTo(0, 0);
  }, [lesson]);

  function getLesson() {
    switch (lesson) {
      case 0:
        return <ChessTerms changeLesson={changeLesson} />;
      case 1:
        return <TheBoard changeLesson={changeLesson} />;
      case 2:
        return <PlacingPieces changeLesson={changeLesson} />;
      case 3:
        return <BasicRules changeLesson={changeLesson} />;
      case 4:
        return <ThePawn changeLesson={changeLesson} />;
      case 5:
        return <TheKnight changeLesson={changeLesson} />;
      case 6:
        return <TheBishop changeLesson={changeLesson} />;
      case 7:
        return <TheRook changeLesson={changeLesson} />;
      case 8:
        return <TheQueen changeLesson={changeLesson} />;
      case 9:
        return <TheKing changeLesson={changeLesson} />;
      case 10:
        return <OtherRules changeLesson={changeLesson} />;
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
    console.log(les);
    setLesson(les);
    setCurrentLesson(les);
  }

  function handlePrev(e) {
    e.preventDefault();
    let les = lesson - 1;
    console.log(les);
    setLesson(les);
    setCurrentLesson(les);
  }

  return (
    <div className={colorTheme}>
      <div className="learn">
        <Navbar />
        <LearnNavbar
          lesson={lesson}
          setLesson={setLesson}
          currentLesson={currentLesson}
          setCurrentLesson={setCurrentLesson}
        />
        <div className="container">
          <div className="lesson">{getLesson()}</div>
        </div>
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
