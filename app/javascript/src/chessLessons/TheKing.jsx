import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function TheKing(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "g3",
    "e6",
    "Bg2",
    "Ke7",
    "Nf3",
    "Kd6",
    "O-O",
    "Kc5",
    "Kh1",
    "Kc6",
    "Kg1",
    "Kb5",
    "Kh1",
    "Kc4",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            The <span>King</span>
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
            It's time to discuss the most important piece on the chessboard- the
            king. The goal of the game is to checkmate the opponent's king,
            which means trapping it so that it cannot escape capture. The king
            may not be the most powerful piece on the board, but it is the most
            valuable one. The king can only move one square at a time in any
            direction, but it is crucial to protect it from attacks by the
            opponent's pieces. Putting your king in danger can lead to a quick
            defeat. The king can never move into check, which means it cannot
            move to a square that is under attack by an opponent's piece. If the
            king is in check, the player must make a move to get the king out of
            check or block the attack. The king can never move into check, which
            means it cannot move to a square that is under attack by an
            opponent's piece. If the king is in check, the player must make a
            move to get the king out of check or block the attack. Always make
            sure to protect you king! A common way to make sure your king is
            safe is to castle your king with your rook! I guess I probably
            refrenced this mystery "castle" move for long enough now. Let's go
            ahead and talk about it in the final lesson. Also, what's an En
            Passant?
          </p>
        </div>
      </div>
    </div>
  );
}
