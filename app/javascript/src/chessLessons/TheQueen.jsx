import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function TheQueen(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "e3",
    "c5",
    "Qh5",
    "Qa5",
    "Qh3",
    "Qa4",
    "Qf5",
    "Qh4",
    "Qxc5",
    "Qh6",
    "Qxc8#",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            The <span>Queen</span>
          </h1>
        </div>
        <div className="board col-12  col-md-6">
          <div>
            <LearnBoard
              startingFen={"8/8/8/8/8/8/8/8 w - - 0 1"}
              fen={fen}
              colorTheme={colorTheme}
              boardWidth={boardWidth}
              setFen={setFen}
              moves={moves}
              showMessage={true}
            />
          </div>
        </div>
        <div className="col-12">
          <p className="content">
            The queen is the most powerful piece in the game because it has the
            most amount of ways to move. It can move how the rook moves as well
            as the bishop! It can move any number of squares horizontally,
            vertically, or diagonally. It can move in any one of the 8
            directions once per move. The queen can't move through its own
            pieces and will capture an opposing players piece by moving itself
            to the position of that piece. This makes the queen a very powerful
            attacking piece.
          </p>
        </div>
      </div>
    </div>
  );
}
