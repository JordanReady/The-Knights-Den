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
            Ah, the mighty rook - also known as the castle, tower, or fortress.
            This piece is a real powerhouse on the board, moving in a straight
            line horizontally or vertically and controlling entire ranks or
            files. The rook can move any number of squares along its current
            file or rank either forwards, backwards, left or right. It can only
            move in one of those 4 directions once per move but cannot move
            diagonally. Its ability to control open files and ranks can be
            crucial in opening up lines of attack for other pieces. And let's
            not forget, our rooks have a special trick up their sleeve - they
            can team up with the king to pull off a fancy move called castling.
            We'll cover that move in more detail later, after we've talked about
            our esteemed royalties, the king and queen. But if you want to see
            it in action, take a peek at the Learn Board where you can watch
            both players perform this maneuver. Just don't strain yourself
            trying to figure it out on your own just yet - I promise I'll walk
            you through it soon! And without any further ado, it's time to move
            on to the most powerful piece on the board - the queen.
          </p>
        </div>
      </div>
    </div>
  );
}
