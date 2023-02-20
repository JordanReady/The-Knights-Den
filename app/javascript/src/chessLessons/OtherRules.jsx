import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function OtherRules(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "g3",
    "b6",
    "Bg2",
    "a6",
    "Nf3",
    "a5",
    "O-O",
    "a4",
    "b4",
    "axb3",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            <span>Special</span> Moves
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
            Alright, alright, settle down everyone. We know you've been
            anxiously waiting for this lesson on castling, so here we go!
            Castling is a special move that can come in handy when you need to
            get your king out of harm's way and bring your rook into play. It's
            like a tag-team move where the king and rook work together to
            preform a little switcheroo. Now, before you get too excited about
            castling, there are some rules you need to follow. First off, the
            king and rook you're using must not have moved yet in the game.
            Otherwise, they're too tired to perform such a feat. Secondly, there
            can't be any pesky pieces blocking the path between the king and
            rook. This isn't a problem for the knight of course because it can
            easily jump over any piece and hop right into the fight. You will
            need to make a pawn shuffle or two in order to get your bishop and
            possibly queen out of the way before continuing though. And, of
            course, the king can't be under attack or waltzing into danger like
            the black king walking all over the place on the last Learn Board.
            That was just silly! To castle king-side, you move the king two
            squares towards the rook on its first rank, then move the rook to
            the square over which the king crossed. Easy peasy. To castle
            queen-side, the king moves to c1 and the rook to d1. Got it? Good.
            Now, let's talk about en passant. It's like a secret handshake that
            only pawns know. This special move allows a pawn to capture an
            opposing pawn that has advanced two squares from its starting
            position and is sitting next to the capturing pawn. The capturing
            pawn moves to the square behind the captured pawn and voila! The
            captured pawn disappears. Just remember, you can only use en passant
            on the very next turn after the opposing pawn has moved. It's like
            catching someone off guard when they least expect it. Sneaky, but
            effective. And that, my friends, concludes our lesson on castling
            and en passant. If you're still confused, take a look at the Learn
            Board above and watch white castling on the king-side and then the
            black a pawn capturing the white b pawn en passant. And there you
            have it! That's everything you need to know to get started playing
            chess. Chess is a game of strategy, patience, and foresight. And as
            we move our pieces across the board, we learn important lessons
            about life and leadership. So whether you're sacrificing a pawn to
            gain an advantage, or maneuvering your king out of harm's way,
            remember the wise words of the knight: "When in doubt, just take the
            bishop."
          </p>
        </div>
      </div>
    </div>
  );
}
