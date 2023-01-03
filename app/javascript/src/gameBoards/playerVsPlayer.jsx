import React from "react";
import { useRef, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

export default function PlayerVsPlayer({ boardWidth }) {
  const chessboardRef = useRef();
  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [currentTimeout, setCurrentTimeout] = useState(undefined);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    console.log("onDrop", sourceSquare, targetSquare);
    const chess = { ...game };
    console.log(chess);
    chess.move({
      from: sourceSquare,
      to: targetSquare,
    });
    setGame(chess);

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
        id="DefaultBoard"
        animationDuration={200}
        boardOrientation={boardOrientation}
        boardWidth={boardWidth}
        position={game.fen()}
        customBoardStyle={{
          borderRadius: "5px",
        }}
        ref={chessboardRef}
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
