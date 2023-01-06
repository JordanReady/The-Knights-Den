import React from "react";
import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function PlayerVsBot({ boardWidth }) {
  const [game, setGame] = useState(new Chess());
  const [currentTimeout, setCurrentTimeout] = useState(undefined);
  const [boardOrientation, setBoardOrientation] = useState("white")

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }   

  function makeRandomMove() {
    const possibleMoves = game.moves();
  
    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) return;
  
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      game.move(possibleMoves[randomIndex]);
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = new Chess(game.fen())
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    // illegal move
    if (move === null) return false;

    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    const newTimeout = setTimeout(makeRandomMove, 200);
    setCurrentTimeout(newTimeout);
    return true;
  }

  return (
    <div className="chessboard">
      <Chessboard
        id="PlayervsBot"
        animationDuration={200}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "5px",
        }}
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
            setBoardOrientation((currentOrientation) =>
              currentOrientation === "white" ? "black" : "white"
            );
          }}
        >
          Flip Board
        </button>
        <button
          className="board-btn"
          onClick={() => {
            setBoardOrientation((currentOrientation) =>
              currentOrientation === "white" ? "black" : "white"
            );
          }}
        >
          Something
        </button>
      </div>
    </div>
  );
}
