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
            Alright, aspiring chess masters, it's time to put some pieces on
            this board and get this game started! Before we dive into the
            nitty-gritty of how these little fellas move, let's get a lay of the
            land. Each player will have a set of six unique pieces to play with,
            and they're all itching to make some moves. But, like most things in
            life, there's a proper way to start things off. At the beginning of
            each game, players will set up their pieces in a mirror image of
            their opponent's set-up, with pawns taking the front line and the
            heavy hitters chillin' in the back. For white, the rooks will stand
            tall on the a1 and h1 squares, while black's rooks will take over a8
            and h8. The knights will be next in line, stationed beside the rooks
            on b1 and g1 for white, and b8 and g8 for black. The bishops will
            flank the knights on c1 and f1 for white, and c8 and f8 for black.
            Now for the big guns - the kings and queens. The queen is always
            going to stand on her own color, with the king by her side. So, for
            white, the queen will reign supreme on the light square of d1, while
            her king hangs out on e1. Black's queen, on the other hand, will
            hold court on the dark square of d8, with her trusty king on e8. And
            voila! You're ready to take on the chess world, one move at a time.
            But, before you do, let's make sure you know the basic rules of the
            game.
          </p>
        </div>
      </div>
    </div>
  );
}
