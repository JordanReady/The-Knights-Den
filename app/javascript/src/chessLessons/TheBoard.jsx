import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function TheBoard(props) {
  const { colorTheme, boardWidth, fen } = props;

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            The <span>Board</span>
          </h1>
        </div>
        <div className="board col-12  col-md-6">
          <div>
            <LearnBoard
              fen={"8/8/8/8/8/8/8/8 w - - 0 1"}
              setFen={fen}
              colorTheme={colorTheme}
              boardWidth={boardWidth}
              muted={true}
            />
          </div>
        </div>
        <div className="col-12">
          <p className="content">
            Welcome to The Knights Den's Learning section, where I'll take you
            from novice to grandmaster in no time. This section is designed for
            beginners who want to learn how to play chess and dominate their
            opponents. If there's ever a term or concept that confuses you,
            don't worry – I've got you covered. Just click the terms button on
            the lower right corner of your screen for quick reference. Okay
            then, let's get started! The chess board is a battlefield of 64
            squares alternating colors from light to dark on every other square.
            It's split up horizontally by what I call ranks, and vertically by
            what I call files. These ranks and files are labeled by letters and
            numbers. Each rank has a number 1-8 across the board, while each
            file has a letter a-h across the board. The entire game of chess
            takes place within these files and ranks! As you explore the board
            and learn the ins and outs of chess, you'll begin to develop your
            own strategies and tactics to outsmart your opponents. But first,
            lets go learn how to setup the board!
          </p>
        </div>
      </div>
    </div>
  );
}
