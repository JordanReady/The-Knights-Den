import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function BasicRules(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "e4",
    "e5",
    "Nf3",
    "d6",
    "d4",
    "Bg4",
    "dxe5",
    "Bxf3",
    "Qxf3",
    "dxe5",
    "Bc4",
    "Nf6",
    "Qb3",
    "Qe7",
    "Nc3",
    "c6",
    "Bg5",
    "b5",
    "Nxb5",
    "cxb5",
    "Bxb5+",
    "Nbd7",
    "O-O-O",
    "Rd8",
    "Rxd7",
    "Rxd7",
    "Rd1",
    "Qe6",
    "Bxd7+",
    "Nxd7",
    "Qb8+",
    "Nxb8",
    "Rd8#",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            Chess <span>Rules</span>
          </h1>
        </div>
        <div className="board col-12  col-md-6">
          <div>
            <LearnBoard
              startingFen={"8/8/8/8/8/8/8/8 w - - 0 1"}
              colorTheme={colorTheme}
              boardWidth={boardWidth}
              fen={fen}
              setFen={setFen}
              moves={moves}
              showMessage={true}
            />
          </div>
        </div>
        <div className="col-12">
          <p className="content">
            Congratulations on getting your pieces set up properly! Now that
            we've got our battlefield established, it's time to learn the basic
            rules of the game. The first thing to remember is that each player
            takes turns moving one of their pieces starting with the white
            player going first. The goal is to put your opponent's king in a
            position where it cannot escape capture, also known as checkmate. In
            the world of chess, each piece has its own unique abilities and
            limitations. Pawns may seem weak and insignificant, but they are the
            backbone of any army. They can only move forward, but they move with
            determination and purpose, inching ever closer to their goal. The
            knights are the daring adventurers of the chessboard, leaping over
            obstacles and outwitting their opponents. They can move in ways that
            no other piece can, making them a valuable asset in any battle.
            Queens are the powerful rulers of the board, able to move in any
            direction they please. They are the most versatile and dangerous
            piece on the board, feared by all who face them. And then there's
            the king - the most important piece on the board. He may be limited
            in his movements, but he is the centerpiece of any strategy. Protect
            him at all costs, and use his special ability to castle to your
            advantage. But if that all seems a bit overwelming or confusing,
            don't worry, I'll be your guide through this new world of chess.
            We'll start with the humble pawn and work our way up to the more
            powerful pieces.
          </p>
        </div>
      </div>
    </div>
  );
}
