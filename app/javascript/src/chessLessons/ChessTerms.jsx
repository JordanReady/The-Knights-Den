import React from "react";

import "../learn/learn.scss";

export default function ChessTerms() {
  return (
    <div className="container">
      <div className="row lesson-row">
        <div className="col-12">
          <h1 className="lesson-title">Chess Terms</h1>
        </div>
        <div className="col-12">
          <p className="content">
            <span className="term shadow">Rank</span> A row of squares on the
            board, numbered 1-8. <br />
            <br />
            <span className="term shadow">File</span> A column of squares on the
            board, labeled a-h. <br />
            <br />
            <span className="term shadow">Square</span> Each individual space on
            the board. <br />
            <br />
            <span className="term shadow">Capture</span> When one piece takes
            another piece by landing on its square. <br />
            <br />
            <span className="term shadow">Check</span> When a player's king is
            under attack by an opponent's piece. <br />
            <br />
            <span className="term shadow">Checkmate</span> When a player's king
            is in check and there is no way to move the king out of capture.{" "}
            <br />
            <br />
            <span className="term shadow">Stalemate</span> When a player has no
            legal moves left and is not in check. <br />
            <br />
            <span className="term shadow">Promotion</span> When a pawn advances
            to the eighth rank and is replaced by a queen, rook, bishop, or
            knight of the same color. <br />
            <br />
            <span className="term shadow">Castling</span> A special move that
            allows the player to move their king to a safer location and bring
            their rook into play. <br />
            <br />
            <span className="term shadow">En passant</span> A special move that
            allows a pawn to capture another pawn "as it passes" through a
            square that the capturing pawn could have otherwise occupied. <br />
            <br />
            <span className="term shadow">Opening</span> The early part of the
            game, where players develop their pieces and build their position.{" "}
            <br />
            <br />
            <span className="term shadow">Middlegame</span> The part of the game
            that follows the opening and leads up to the endgame. <br />
            <br />
            <span className="term shadow">Endgame</span> The final part of the
            game, where there are few pieces left on the board and players try
            to checkmate their opponent's king.
          </p>
        </div>
      </div>
    </div>
  );
}
