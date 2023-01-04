import React from "react";

import "./learn.scss";

const LearnNavbar = (props) => {
  function handleClick(e) {
    e.preventDefault();
    let lesson = e.target.id;
    console.log(lesson);
    props.changeLesson(lesson);
  }

  return (
    <React.Fragment>
      <ul className="nav lesson-nav">
        <li className="nav-item">
          <button id="1" className="game-btn" onClick={handleClick}>
            1
          </button>
        </li>
        <li className="nav-item">
          <button id="2" className="game-btn" onClick={handleClick}>
            2
          </button>
        </li>
        <li className="nav-item">
          <button id="3" className="game-btn" onClick={handleClick}>
            3
          </button>
        </li>
        <li className="nav-item">
          <button id="4" className="game-btn" onClick={handleClick}>
            4
          </button>
        </li>
        <li className="nav-item">
          <button id="5" className="game-btn" onClick={handleClick}>
            5
          </button>
        </li>
        <li className="nav-item">
          <button id="6" className="game-btn" onClick={handleClick}>
            6
          </button>
        </li>
        <li className="nav-item">
          <button id="7" className="game-btn" onClick={handleClick}>
            7
          </button>
        </li>
        <li className="nav-item">
          <button id="8" className="game-btn" onClick={handleClick}>
            8
          </button>
        </li>
        <li className="nav-item">
          <button id="9" className="game-btn" onClick={handleClick}>
            9
          </button>
        </li>
        <li className="nav-item">
          <button id="10" className="game-btn" onClick={handleClick}>
            10
          </button>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default LearnNavbar;
