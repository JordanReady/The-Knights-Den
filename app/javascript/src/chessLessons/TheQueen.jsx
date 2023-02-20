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
            The queen is the most powerful piece on the board, and for good
            reason. It's able to move like every other piece in the game - the
            bishop, the rook, and even the pawns - all rolled up into one. Well,
            almost every piece. It can't move like the awesome knights, but
            let's be honest, what can? The queen has the ability to move freely
            in any one of the eight directions once per move. She can take on
            any other piece on the board, but she can't move through her own
            pieces. When she captures an opposing piece, she takes its position
            on the board. The queen is a true force to be reckoned with and may
            be the most powerful piece on the board. Although, some knights may
            argue that it's only the second most powerful piece when you
            consider all the unique abilities the knights have to offer. But
            hey, that might be a bit biased around here in the Knights Den, and
            we don't want to offend any queens out there! But enough about the
            queen, it's time to shift our focus to her royal companion - the
            king.
          </p>
        </div>
      </div>
    </div>
  );
}
