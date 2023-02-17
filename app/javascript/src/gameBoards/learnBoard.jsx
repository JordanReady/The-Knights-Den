import React from "react";
import { useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import "./board.scss";

export default function LearnBoard(props) {
  const {
    boardWidth,
    colorTheme,
    fen,
    setFen,
    muted,
    moves,
    showMessage,
    setShowMessage,
    fens,
    startFen,
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
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [darkSquareColor, setDarkSquareColor] = useState("#b58863");
  const [lightSquareColor, setLightSquareColor] = useState("#f0d9b5");
  const [moveIndex, setMoveIndex] = useState(0);

  const boardSetUp = () => {
    if (startFen) {
      setFen(startFen);
      setGame(new Chess(startFen));
    }
  };

  useEffect(() => {
    if (startFen) {
      boardSetUp();
    }
  }, []);

  useEffect(() => {
    if (moveIndex === -1 && startFen) {
      boardSetUp();
      return;
    }
    let intervalId;
    intervalId = setInterval(() => {
      // if it is the last move, set the game over message
      if (moveIndex === moves.length - 1) {
        if (showMessage === true && !startFen) {
          setGameOver(true);
          setGameOverMessage("Checkmate! Game over.");
          setGame(new Chess());
          setFen(game.fen());
        } else if (showMessage == false && startFen) {
          setGame(new Chess());
          setFen(game.fen(startFen));
        } else setGame(new Chess());
        setFen(game.fen());
      }
      if (moveIndex >= moves.length && moves.length > 0) {
        clearInterval(intervalId);
        setGameOver(false);
        setGameOverMessage("");
        setMoveIndex(-1);
        return;
      }
      game.move(moves[moveIndex]);
      setFen(game.fen());
      setMoveIndex(moveIndex + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [moveIndex]);

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

  function onDrop(sourceSquare, targetSquare) {
    if (muted !== true) {
      const gameCopy = { ...game };
      const move = gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q", // always promote to a queen for example simplicity
      });
      setFen(gameCopy.fen());
      setGame(gameCopy);
      // illegal move
      if (move === null) return false;

      return true;
    }
  }

  function getMoveOptions(square) {
    if (muted !== true) {
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
  }

  function onSquareClick(square) {
    if (muted !== true) {
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
      setFen(gameCopy.fen());

      // if invalid, setMoveFrom and getMoveOptions
      if (move === null) {
        resetFirstMove(square);
        return;
      }
      setMoveFrom("");
      setOptionSquares({});
    }
  }

  function onSquareRightClick(square) {
    if (muted !== true) {
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
  }

  return (
    <div className={colorTheme}>
      <div className="chessboard">
        {gameOver && (
          <div className="learn-game-over-message">
            {gameOverMessage} <br />
            {gameWinner}
          </div>
        )}
        <Chessboard
          id="learnBoard"
          animationDuration={200}
          boardOrientation={boardOrientation}
          boardWidth={boardWidth}
          position={fen}
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
      </div>
    </div>
  );
}
