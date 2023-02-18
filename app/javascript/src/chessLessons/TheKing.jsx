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
            The king is the most important piece in chess. The king can move to
            any adjacent square that is not occupied by one of its own pieces.
            It can move horizontally, vertically, or diagonally. The king cannot
            move to a square that is attacked by an enemy piece. While you may
            think of the king less of an attacking piece, it plays an important
            role in the later stages of the game. This is because it plays a key
            role in helping the player's other pieces coordinate their attacks
            and defend against the opponent's pieces. Always make sure to
            protect you king! A common way to make sure your king is safe is to
            castle your king with your rook. This is the special move that was
            mentioned in the rook lesson. We will go over this move along with
            En Passant in the next lesson.
          </p>
        </div>
      </div>
    </div>
  );
}
