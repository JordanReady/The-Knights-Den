import React from 'react';
import { useRef, useState } from 'react';
import { Chess } from 'chess.js';
import { Chessboard } from 'react-chessboard';

export default function PlayerVsBot({ boardWidth }) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState('white');
  const [currentTimeout, setCurrentTimeout] = useState(undefined);

  function onDragStart (source, piece, position, orientation) {
    // do not pick up pieces if the game is over
    if (game.game_over()) return false
  
    // only pick up pieces for the side to move
    if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
        (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
      return false
    }
  }
  
  function onDrop (source, target) {
    // see if the move is legal
    var move = game.move({
      from: source,
      to: target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
    })
  
    // illegal move
    if (move === null) return 'snapback'
  
    updateStatus()
  }
  
  // update the board position after the piece snap
  // for castling, en passant, pawn promotion
  function onSnapEnd () {
    board.position(game.fen())
  }
  
  function updateStatus () {
    var status = ''
  
    var moveColor = 'White'
    if (game.turn() === 'b') {
      moveColor = 'Black'
    }
  
    // checkmate?
    if (game.in_checkmate()) {
      status = 'Game over, ' + moveColor + ' is in checkmate.'
    }
  
    // draw?
    else if (game.in_draw()) {
      status = 'Game over, drawn position'
    }
  
    // game still on
    else {
      status = moveColor + ' to move'
  
      // check?
      if (game.in_check()) {
        status += ', ' + moveColor + ' is in check'
      }
    }
  }

  return (
    <div className='chessboard'>
      <Chessboard
        id="PlayervsBot"
        animationDuration={200}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        position={game.fen()}
        customBoardStyle={{
          borderRadius: '5px'
        }}
        ref={chessboardRef}
      />
      <div className="btn-row">
          <button
            className="board-btn"
            onClick={() => {
              safeGameMutate((game) => {
                game.reset();
              });
              // stop any current timeouts
              clearTimeout(currentTimeout);
            }}
          >
            Reset
          </button>
          <button
            className="board-btn"
            onClick={() => {
              safeGameMutate((game) => {
                game.undo();
              });
              // stop any current timeouts
              clearTimeout(currentTimeout);
            }}
          >
            Undo
          </button>
          <button
            className="board-btn"
            onClick={() => {
              setBoardOrientation((currentOrientation) => (currentOrientation === 'white' ? 'black' : 'white'));
            }}
          >
            Flip Board
          </button>
        </div>
    </div>
  );
}