import React from "react";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import "./board.scss";

export default function DefaultBoard(props) {
  const {
    boardWidth,
    whiteMoves = [],
    setWhiteMoves,
    blackMoves = [],
    setBlackMoves,
    handleMove,
  } = props;

  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [moveFrom, setMoveFrom] = useState("");
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [gameWinner, setGameWinner] = useState("");

  useEffect(() => {
    const gameCopy = { ...game };
    const turn = gameCopy.turn();
    if (gameCopy.game_over()) {
      setGameOver(true);
      if (game.in_checkmate()) {
        setGameOverMessage("Checkmate! Game over.");
        if (turn === "w") {
          setGameWinner("Black Wins!");
        }
        if (turn === "b") {
          setGameWinner("White Wins!");
        }
      } else if (game.in_stalemate()) {
        setGameOverMessage("Stalemate! Game over.");
      } else if (game.insufficient_material()) {
        setGameOverMessage("insufficient material! Game over.");
      } else if (game.in_threefold_repetition()) {
        setGameOverMessage("Threefold repetition! Game over.");
      } else if (game.in_draw()) {
        setGameOverMessage("Draw! Game over.");
      }
    }
  }, [game]);

  function safeGameMutate(modify) {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }

  function onDrop(sourceSquare, targetSquare) {
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    });
    setGame(gameCopy);
    // illegal move
    if (move === null) return false;
    // set moves
    handleMove(move, gameCopy.turn());

    return true;
  }

  function getMoveOptions(square) {
    const moves = game.moves({
      square,
      verbose: true,
    });
    if (moves.length === 0) {
      return;
    }

    const newSquares = {};
    moves.map((move) => {
      newSquares[move.to] = {
        background:
          game.get(move.to) &&
          game.get(move.to).color !== game.get(square).color
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%)"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
      return move;
    });
    newSquares[square] = {
      background: "rgba(255, 255, 0, 0.4)",
    };
    setOptionSquares(newSquares);
  }

  function onSquareClick(square) {
    setRightClickedSquares({});

    function resetFirstMove(square) {
      setMoveFrom(square);
      getMoveOptions(square);
    }

    // from square
    if (!moveFrom) {
      resetFirstMove(square);
      return;
    }

    // attempt to make move
    const gameCopy = { ...game };
    const move = gameCopy.move({
      from: moveFrom,
      to: square,
      promotion: "q", // always promote to a queen for example simplicity
    });
    setGame(gameCopy);

    // if invalid, setMoveFrom and getMoveOptions
    if (move === null) {
      resetFirstMove(square);
      return;
    }
    handleMove(move, gameCopy.turn());
    setMoveFrom("");
    setOptionSquares({});
  }

  function onSquareRightClick(square) {
    const colour = "rgba(0, 0, 255, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === colour
          ? undefined
          : { backgroundColor: colour },
    });
  }

  return (
    <>
      <div className="chessboard">
        {gameOver && (
          <div className="game-over-message">
            {gameOverMessage} <br />
            {gameWinner}
          </div>
        )}
        <Chessboard
          id="defaultBoard"
          animationDuration={200}
          boardOrientation={boardOrientation}
          boardWidth={boardWidth}
          position={game.fen()}
          onSquareClick={onSquareClick}
          onSquareRightClick={onSquareRightClick}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "5px",
          }}
          customSquareStyles={{
            ...moveSquares,
            ...optionSquares,
            ...rightClickedSquares,
          }}
        />
        <div className="btn-row">
          <button
            className="board-btn"
            onClick={() => {
              safeGameMutate((game) => {
                game.reset();
                setGameOver(false);
                setWhiteMoves([]);
                setBlackMoves([]);
              });
            }}
          >
            Reset
          </button>
          <button
            className="board-btn"
            onClick={() => {
              safeGameMutate((game) => {
                game.undo();
                setGameOver(false);
                if (game.turn() === "w") {
                  setWhiteMoves(whiteMoves.slice(0, -1));
                }
                if (game.turn() === "b") {
                  setBlackMoves(blackMoves.slice(0, -1));
                }
              });
            }}
          >
            Undo
          </button>
          <button
            className="board-btn"
            onClick={() => {
              setBoardOrientation(
                boardOrientation === "white" ? "black" : "white"
              );
            }}
          >
            Flip Board
          </button>
        </div>
      </div>
    </>
  );
}
