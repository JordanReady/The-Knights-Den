import React from "react";
import { useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function PlayerVsPlayer({ boardWidth }) {
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState("white");

  function makeAMove(move) {
    const gameCopy = { ...game };
    const result = gameCopy.move(move);
    setGame(gameCopy);
    return result; // null if the move was illegal, the move object if the move was legal
  }

  function onDrop(sourceSquare, targetSquare) {
    const move = makeAMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });

    // illegal move
    if (move === null) return false;
    // flip the board orientation after the move is made
    setBoardOrientation((currentOrientation) =>
      currentOrientation === "white" ? "black" : "white"
    );
    return true;
  }

  return (
    <div className="chessboard">
      <Chessboard
        id="PlayerVsPlayer"
        animationDuration={200}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        position={game.fen()}
        onPieceDrop={onDrop}
        customBoardStyle={{
          borderRadius: "5px",
        }}
      />
      <div className="gap"></div>
      <div className="gap"></div>
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
      </div>
    </div>
  );
}
