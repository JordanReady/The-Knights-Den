import React from "react";

import "../learn/learn.scss";

export default function TheKing(props) {
  return (
    <div className="container">
      <div className="row lesson-row">
        <div className="col-12">
          <h1 className="lesson-title">The King</h1>
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
            protect you king!
          </p>
        </div>
      </div>
    </div>
  );
}
