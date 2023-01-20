import React from "react";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import "./board.scss";

export default function PlayerVsBot(props) {
  const {
    boardWidth,
    whiteMoves = [],
    setWhiteMoves,
    blackMoves = [],
    setBlackMoves,
    handleMove,
    colorTheme,
  } = props;

  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [currentTimeout, setCurrentTimeout] = useState(null);
  const [moveFrom, setMoveFrom] = useState("");
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState("");
  const [gameWinner, setGameWinner] = useState("");
  const [moveNumber, setMoveNumber] = useState(0);
  const [playerColor, setPlayerColor] = useState("w");
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [darkSquareColor, setDarkSquareColor] = useState("#b58863");
  const [lightSquareColor, setLightSquareColor] = useState("#f0d9b5");

  useEffect(() => {
    // set colors
    if (colorTheme === "blue") {
      setDarkSquareColor("#4682b4");
      setLightSquareColor("#add8e6");
    } else if (colorTheme === "green") {
      setDarkSquareColor("#4f583c");
      setLightSquareColor("#acb192");
    } else if (colorTheme === "red") {
      setDarkSquareColor("#ec2323");
      setLightSquareColor("#fdadad");
    } else if (colorTheme === "purple") {
      setDarkSquareColor("#462578");
      setLightSquareColor("#e1a1fa");
    } else {
      setDarkSquareColor("#b58863");
      setLightSquareColor("#f0d9b5");
    }
  }, [colorTheme]);

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
        setGameOverMessage("Insufficient material! Game over.");
      } else if (game.in_threefold_repetition()) {
        setGameOverMessage("Threefold repetition! Game over.");
      } else if (game.in_draw()) {
        setGameOverMessage("Draw! Game over.");
      }
    }
    setMoveNumber(moveNumber + 1);
  }, [game]);

  useEffect(() => {
    setTimeout(() => {
      makeRandomMove();
    }, 800);
  }, [playerColor]);

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
    // store timeout so it can be cleared on undo/reset so computer doesn't execute move
    const newTimeout = setTimeout(makeRandomMove, 200);
    setCurrentTimeout(newTimeout);
    return true;
  }

  function getMoveOptions(square) {
    if (square === selectedPiece) {
      setOptionSquares({});
      setSelectedPiece(null);
      return;
    }
    setSelectedPiece(square);
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
            ? "radial-gradient(circle, rgba(0,0,0,.1) 85%, transparent 85%"
            : "radial-gradient(circle, rgba(0,0,0,.1) 25%, transparent 25%)",
        borderRadius: "50%",
      };
    });
    setOptionSquares(newSquares);
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    const gameCopy = { ...game };
    // exit if the player color is making the random move
    if (playerColor === gameCopy.turn()) return;

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    safeGameMutate((game) => {
      const move = possibleMoves[randomIndex];
      const moveObj = game.move(move);

      game.move(move);
      handleMove(moveObj, gameCopy.turn());
    });
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
    setTimeout(makeRandomMove, 500);
    setMoveFrom("");
    setOptionSquares({});
  }

  function onSquareRightClick(square) {
    const color = "rgba(255, 0, 0, 0.4)";
    setRightClickedSquares({
      ...rightClickedSquares,
      [square]:
        rightClickedSquares[square] &&
        rightClickedSquares[square].backgroundColor === color
          ? undefined
          : { backgroundColor: color },
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
          id="PlayerVsBot"
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
          customDarkSquareStyle={{
            backgroundColor: darkSquareColor,
          }}
          customLightSquareStyle={{
            backgroundColor: lightSquareColor,
          }}
        />
        <div className="btn-row">
          <button
            className="board-btn"
            onClick={() => {
              safeGameMutate((game) => {
                game.reset();
                setGameOver(false);
                setMoveNumber(0);
                setWhiteMoves([]);
                setBlackMoves([]);
              });
              // stop any current timeouts
              clearTimeout(currentTimeout);
              //if player is black, make a random move
              if (playerColor === "b") {
                setTimeout(makeRandomMove, 500);
              }
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
                setMoveNumber(moveNumber - 2);
                if (game.turn() === "w") {
                  setWhiteMoves(whiteMoves.slice(0, -1));
                }
                if (game.turn() === "b") {
                  setBlackMoves(blackMoves.slice(0, -1));
                }
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
              setPlayerColor("w");
              safeGameMutate((game) => {
                game.reset();
                setGameOver(false);
                setMoveNumber(0);
                setWhiteMoves([]);
                setBlackMoves([]);
                setBoardOrientation("white");
              });
            }}
          >
            Play White
          </button>
          <button
            className="board-btn"
            onClick={() => {
              safeGameMutate((game) => {
                game.reset();
                setPlayerColor("b");
                setGameOver(false);
                setMoveNumber(0);
                setWhiteMoves([]);
                setBlackMoves([]);
                setBoardOrientation("black");
                makeRandomMove();
              });
              // if player is black, make a random move
              if (playerColor === "b") {
                safeGameMutate((game) => {
                  game.reset();
                  setGameOver(false);
                  setMoveNumber(0);
                  setWhiteMoves([]);
                  setBlackMoves([]);
                  setBoardOrientation("black");
                });
                setTimeout(makeRandomMove, 500);
              }
            }}
          >
            Play Black
          </button>
        </div>
      </div>
    </>
  );
}
