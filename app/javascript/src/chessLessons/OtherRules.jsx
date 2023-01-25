import React from "react";

import "../learn/learn.scss";

export default function OtherRules(props) {
  return (
    <div className="container">
      <div className="row lesson-row">
        <div className="col-12">
          <h1 className="lesson-title">Special Moves</h1>
        </div>
        <div className="col-12">
          <p className="content">
            There are a few special moves in chess that you are able to do in
            certain situations. Castling is a move that allows the player to
            move their king to a safer location and bring their rook into play.
            It is a two-part move that consists of moving the king two squares
            towards a rook on its first rank, then moving the rook to the square
            over which the king crossed. There are a few things that need to be
            true in order to castle though. The first being, the king and the
            rook that are being used to castle must not have moved yet in the
            game. There must not be any pieces between the king and the rook.
            The king must not be under attack by an opposing players piece. The
            king cannot move through any squares that are attacked by an anemy
            piece. For the white player to castle kingside, the king is moved
            from e1 to g1, and the rook is moved from h1 to f1. To castle
            queenside, the king is moved from e1 to c1 and the rook is moved
            from a1 to d1. Castling happens very often in chess games. Just try
            and remember when castling, the king moves two squares towards the
            rook you are castling with, and that rook ends up on the other side
            of the king. The other special move involves the pawns and it is
            known as en passant which was previously mentioned in the pawn
            lesson. En passant is a special move that can be made by a pawn that
            captures another pawn as it passes through a square that the
            capturing pawn could have otherwise occupied. Like castling, there
            are a few things that need to be true in order to make this move.
            The capture of the pawn can only be made on the very next turn after
            the pawn being captured has advanced two squares from its starting
            position. The capturing pawn must be on an adjacent file to the pawn
            being captured. The capturing pawn must advance to the square behind
            the pawn being captured. This move isn't as common as castling but
            it is important to be aware of this rule in case a benificial
            oportunity to use it occurs.
          </p>
        </div>
      </div>
    </div>
  );
}
