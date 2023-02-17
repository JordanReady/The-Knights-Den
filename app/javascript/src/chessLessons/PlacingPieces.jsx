import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function PlacingPieces(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            <span>Placing</span> Pieces
          </h1>
        </div>
        <div className="board col-12  col-md-6">
          <div>
            <LearnBoard
              fen={fen}
              setFen={setFen}
              colorTheme={colorTheme}
              boardWidth={boardWidth}
              moves={[]}
              muted={true}
            />
          </div>
        </div>
        <div className="col-12">
          <p className="content">
            Now that we understand the board the chess game is played on, it is
            time to introduce the pieces that are placed on the chess board.
            There are 6 different types of pieces that all have unique ways to
            move. We will go into more detail about how each piece moves later.
            For now, lets learn where the pieces go to begin the game. At the
            start of each game, each player will have an identical set of pieces
            in the opposite color as their opponent. This will consist of 8
            pawns, which will stand on the entire second rank for the white
            player, and the entire seventh rank for the black player. Next comes
            the pair of rooks which are placed on the a1 and h1 squares for
            white, and the a8 and h8 squares for black. Notice the letter
            represents the file the piece is placed on and the number represents
            the file. This is the standard way to specify a certain square on
            the chess board. We will be using this naming convention for the
            rest of the pieces as well. Now we will place the pair of knights.
            For white, the knights will be placed next to the rooks on b1 and g1
            and black will mirror this placement on b8 and g8. After the
            knights, we will place the pair of bishops next to them on squares
            c1 and f1 for white, and c8 and f8 for black. That leaves us with
            two empty squares on each player's back rank, which will be the
            starting squares for the most valuable pieces, the king, and queen.
            The queen is always going to stand on its own color with the king
            right by her side. So for white, we will place the queen on the
            light square, d1 with her king on e1. Blacks queen will stand on the
            dark square d8 with her king on e8. And that is how every game of
            chess will start!
          </p>
        </div>
      </div>
    </div>
  );
}
