import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function TheBoard(props) {
  const { colorTheme, boardWidth } = props;

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
              colorTheme={colorTheme}
              boardWidth={boardWidth}
              moves={[]}
              muted={true}
            />
          </div>
        </div>
        <div className="col-12">
          <p className="content">
            Welcome to the learning section of the app. This was created for
            beginners who want to learn how to play chess. If there is ever a
            point during a lesson where a term is used that you are unfamiliar
            with, you can click the terms button on the lower right corner of
            your screen for reference. Okay then, let's get started! The chess
            board is an 8 by 8 grid of squares alternating colors from light to
            dark on every other square. The board is split up horizantally by
            what are known as ranks, and horizantally by what are known as
            files. These ranks and files are labeled by letters and numbers.
            Each horizontal rank has a file number 1 - 8 across the board, and
            each file has a file letter a - h across the board. The entire game
            of chess is restricted to piece movements inside these files and
            ranks!
          </p>
        </div>
      </div>
    </div>
  );
}
