import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function ThePawn(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "d4",
    "d5",
    "b3",
    "b6",
    "b4",
    "b5",
    "f3",
    "a6",
    "e4",
    "dxe4",
    "fxe4",
    "e6",
    "e5",
    "f5",
    "exf6",
    "h5",
    "fxg7",
    "h4",
    "gxh8=Q",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            The <span>Pawn</span>
          </h1>
        </div>
        <div className="board col-12  col-md-6">
          <div>
            <LearnBoard
              fen={fen}
              setFen={setFen}
              colorTheme={colorTheme}
              boardWidth={boardWidth}
              moves={moves}
              showMessage={false}
            />
          </div>
        </div>
        <div className="col-12">
          <p className="content">
            Now we have some idea on how to play a game of chess, so let's get
            started with the most important piece on the board - the pawn! Yes,
            that's right, the lowly pawn, often dismissed as mere fodder for the
            grander pieces. Okay, probably not the 'most' important, but the
            pawns are actually the backbone of your defense. Pawns are the only
            pieces that cannot move backward, so you must choose their placement
            carefully. They are also the only pieces that capture differently
            from how they move.As previously mentioned, pawns can only move
            forward, one or two squares on their first move, and one square
            thereafter. Pawns capture diagonally, one square forward and to the
            left or right. However, they cannot capture the piece directly in
            front of them, which can make them feel a little useless at times.
            But don't be fooled by their humble appearance! Pawns are critical
            to controlling the center of the board and limiting your opponent's
            mobility. In fact, the famous chess player and teacher Aron
            Nimzowitsch once said, "The passed pawn is a criminal, who should be
            kept under lock and key. Mild measures, such as police surveillance,
            are not sufficient." So, be sure to use your pawns strategically,
            protecting them as they move up the board, and don't underestimate
            their value. And in the next lesson, we'll focus on the knight - the
            only piece that can jump over others and move in a unique L-shaped
            pattern. So saddle up your horsey and get ready for this powerful
            piece.
          </p>
        </div>
      </div>
    </div>
  );
}
