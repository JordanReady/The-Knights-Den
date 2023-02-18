import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function TheRook(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "h4",
    "a5",
    "Rh3",
    "Ra6",
    "Rd3",
    "Nf6",
    "Ra3",
    "g6",
    "Rxa5",
    "Rxa5",
    "Nc3",
    "Bg7",
    "d3",
    "O-O",
    "Bg5",
    "Rxg5",
    "Qd2",
    "Rb5",
    "O-O-O",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            The <span>Rook</span>
          </h1>
        </div>
        <div className="board col-12  col-md-6">
          <div>
            <LearnBoard
              fen={fen}
              setFen={setFen}
              colorTheme={colorTheme}
              boardWidth={boardWidth}
              showMessage={false}
              moves={moves}
            />
          </div>
        </div>
        <div className="col-12">
          <p className="content">
            The rook, much like the bishop, is a long range attacking piece. The
            rook however, can move any number of squares along its current file
            or rank either forwards, backwards, left or right. It can only move
            in one of those 4 directions once per move and cannot move
            diagonally ever. The rook can't move through its own pieces and will
            capture an opposing players piece by moving itself to the position
            of that piece. The rook also has a special move called castling
            which we will cover in a later lesson.
          </p>
        </div>
      </div>
    </div>
  );
}
