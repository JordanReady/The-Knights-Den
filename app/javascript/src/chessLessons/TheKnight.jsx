import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function TheKnight(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "Nc3",
    "Nh6",
    "Ne4",
    "c5",
    "Nxc5",
    "Nc6",
    "Nd3",
    "Nf5",
    "Nf3",
    "Ncd4",
    "Nxd4",
    "Nxd4",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            The <span>Knight</span>
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
            The knight is a unique piece in chess because it is the only piece
            that can move around or over another piece. Knights move in a
            pattern that resembles the letter "L". It must move 3 squares in
            total vertically and horizontally. The order can be either two
            squares forward, backward, left or right, then one square
            horizontally or vertically to complete the "L" shape. Or you could
            start with one square forward, backward, left or right, then two
            squares horizontally or vertically to complete the "L" shape.
            Another way to think about the way a knight can move would be by
            starting with either of the 4 squares diagonal to the knight, and
            then moving one square horizontally or vertically from that square
            so long as the square vertically or horizontally isn't right next to
            the starting position of the knight. Any of these methods will give
            you the correct legal moves of the knight so you can go ahead and
            use whichever method is easier to understand. The knight will
            capture any opponents piece that it lands on. This is the only other
            piece besides a pawn that you can move for the first move of the
            game because it can jump right over your own pawns!
          </p>
        </div>
      </div>
    </div>
  );
}
