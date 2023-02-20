import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function TheBishop(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "g3",
    "e5",
    "Bg2",
    "b6",
    "Bxa8",
    "Bc5",
    "b3",
    "d5",
    "Bb2",
    "Bf5",
    "Bxe5",
    "Bg6",
    "Bxd5",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            The <span>Bishop</span>
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
            Alright, now that we've talked about the humble pawn and the mighty
            knight, it's time to turn our attention to the bishop. Bishops are
            another type of piece in chess, and they're the only ones that can
            move diagonally across the board. Each player starts with two
            bishops: one on a light-colored square and one on a dark-colored
            square. The bishop's power lies in its ability to control long,
            diagonal lines on the board. This can make it a valuable piece to
            control, especially if it's well-positioned to attack your
            opponent's pieces. But the bishop does have some limitations. Unlike
            the knight, it can't jump over other pieces on the board. And, like
            all pieces in chess, it can't move through another piece. One
            important thing to remember about bishops is that they can only move
            on squares of the same color that they start on. This means that if
            your light-squared bishop is on a white square, it can only move on
            other white squares. If it's on a black square, it can only move on
            other black squares. As you may have noticed on your Learn Board,
            after the pawns have had their little one-step shuffle, the bishops
            are finally unlocked and free to take to the stage. Knights, on the
            other hand, can't be bothered with this silly dance routine, which
            is why they leap right over the pawns when making their grand
            entrance. Now that we've covered the powerful diagonal movements of
            the bishops, the fancy footwork of the knights, and the uninpressive
            shuffle of the pawns, it's time to turn our attention to the
            straight-shooting rooks. They may not be as flashy as some of the
            other pieces, but don't be fooled - they can still pack a punch on
            the board.
          </p>
        </div>
      </div>
    </div>
  );
}
