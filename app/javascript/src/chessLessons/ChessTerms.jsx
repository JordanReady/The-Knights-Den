import React from "react";

import "./lessons.scss";

export default function ChessTerms(props) {
  function handleClick(e) {
    e.preventDefault();
    let lesson = e.target.id;
    props.changeLesson(lesson);
  }

  return (
    <div className="container">
      <div className="row lesson-row">
        <div className="col-12">
          <h1 className="lesson-title">Chess Terms</h1>
        </div>
        <div className="col-12">
          <p className="content">
            <span className="term">Rank</span> A row of squares on the board,
            numbered 1-8. <br />
            <br />
            <span className="term">File</span> A column of squares on the board,
            labeled a-h. <br />
            <br />
            <span className="term">Square</span> Each individual space on the
            board. <br />
            <br />
            <span className="term">Capture</span> When one piece takes another
            piece by landing on its square. <br />
            <br />
            <span className="term">Check</span> When a player's king is under
            attack by an opponent's piece. <br />
            <br />
            <span className="term">Checkmate</span> When a player's king is in
            check and there is no way to move the king out of capture. <br />
            <br />
            <span className="term">Stalemate</span> When a player has no legal
            moves left and is not in check. <br />
            <br />
            <span className="term">Promotion</span> When a pawn advances to the
            eighth rank and is replaced by a queen, rook, bishop, or knight of
            the same color. <br />
            <br />
            <span className="term">Castling</span> A special move that allows
            the player to move their king to a safer location and bring their
            rook into play. <br />
            <br />
            <span className="term">En passant</span> A special move that allows
            a pawn to capture another pawn "as it passes" through a square that
            the capturing pawn could have otherwise occupied. <br />
            <br />
            <span className="term">Opening</span> The early part of the game,
            where players develop their pieces and build their position. <br />
            <br />
            <span className="term">Middlegame</span> The part of the game that
            follows the opening and leads up to the endgame. <br />
            <br />
            <span className="term">Endgame</span> The final part of the game,
            where there are few pieces left on the board and players try to
            checkmate their opponent's king.
          </p>
          <div className="lesson-btn-row">
            <button id="1" className="lesson-btn" onClick={handleClick}>
              Lessons
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
