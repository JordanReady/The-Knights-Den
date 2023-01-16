import React from "react";

import "./learn.scss";

const LearnNavbar = (props) => {
  const { setLesson, currentLesson, setCurrentLesson } = props;

  function handleClick(e) {
    e.preventDefault();
    let lesson = e.target.id;
    lesson = parseInt(lesson);
    setLesson(lesson);
    setCurrentLesson(lesson);
  }

  return (
    <React.Fragment>
      <ul className="nav lesson-nav">
        <li className="nav-item">
          {currentLesson === 1 ? (
            <button id="1" className="game-btn active" onClick={handleClick}>
              1
            </button>
          ) : (
            <button id="1" className="game-btn" onClick={handleClick}>
              1
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 2 ? (
            <button id="2" className="game-btn active" onClick={handleClick}>
              2
            </button>
          ) : (
            <button id="2" className="game-btn" onClick={handleClick}>
              2
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 3 ? (
            <button id="3" className="game-btn active" onClick={handleClick}>
              3
            </button>
          ) : (
            <button id="3" className="game-btn" onClick={handleClick}>
              3
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 4 ? (
            <button id="4" className="game-btn active" onClick={handleClick}>
              4
            </button>
          ) : (
            <button id="4" className="game-btn" onClick={handleClick}>
              4
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 5 ? (
            <button id="5" className="game-btn active" onClick={handleClick}>
              5
            </button>
          ) : (
            <button id="5" className="game-btn" onClick={handleClick}>
              5
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 6 ? (
            <button id="6" className="game-btn active" onClick={handleClick}>
              6
            </button>
          ) : (
            <button id="6" className="game-btn" onClick={handleClick}>
              6
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 7 ? (
            <button id="7" className="game-btn active" onClick={handleClick}>
              7
            </button>
          ) : (
            <button id="7" className="game-btn" onClick={handleClick}>
              7
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 8 ? (
            <button id="8" className="game-btn active" onClick={handleClick}>
              8
            </button>
          ) : (
            <button id="8" className="game-btn" onClick={handleClick}>
              8
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 9 ? (
            <button id="9" className="game-btn active" onClick={handleClick}>
              9
            </button>
          ) : (
            <button id="9" className="game-btn" onClick={handleClick}>
              9
            </button>
          )}
        </li>
        <li className="nav-item">
          {currentLesson === 10 ? (
            <button id="10" className="game-btn active" onClick={handleClick}>
              10
            </button>
          ) : (
            <button id="10" className="game-btn" onClick={handleClick}>
              10
            </button>
          )}
        </li>
      </ul>
    </React.Fragment>
  );
};

export default LearnNavbar;
