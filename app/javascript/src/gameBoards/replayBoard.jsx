import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

import "./board.scss";

const ReplayBoard = (props) => {
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
  const [autoPlay, setAutoPlay] = useState(false);

  const moves = [
    "e4",
    "e5",
    "Nf3",
    "Nc6",
    "Bc4",
    "Nf6",
    "Ng5",
    "d5",
    "exd5",
    "Na5",
    "Bb5+",
    "c6",
    "dxc6",
    "bxc6",
    "Ba4",
    "Nc4",
    "Bxc6+",
    "Ke7",
    "Nxf7",
    "Qe8",
    "Nxh8",
    "Bg4",
    "Qf3",
    "Nd6",
    "h3",
    "Bh5",
    "g4",
    "Bg6",
    "Ne5",
    "Qxe5",
    "d3",
    "Qe7",
    "Qe2",
    "Nf5",
    "gxf5",
    "Bxf5",
    "Ke2",
    "Bg6",
    "Rf1",
    "Qe6",
    "f4",
    "Qe5+",
    "Kf3",
    "Qe4+",
    "Kg3",
    "h5",
    "Rf2",
    "Qg4+",
    "Kh3",
    "Qh4+",
    "Kg2",
    "Qg4+",
    "Kh1",
    "Qh4+",
    "Kg1",
    "Qg4+",
    "Kf1",
    "Qf5+",
    "Ke1",
    "Qe4+",
    "Kd1",
    "Qd3+",
    "Kc1",
    "Qc2#",
  ];

  const handleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  useEffect(() => {
    let intervalId;
    if (autoPlay) {
      intervalId = setInterval(() => handleNextMove(), 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [autoPlay, handleNextMove]);

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
    // check for game over
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
  }, [game]);

  useEffect(() => {
    // iterate through the moves and make them on the chess board
    for (let i = 0; i < moveIndex; i++) {
      game.move(moves[i]);
    }
  }, [moveIndex]);

  function handlePreviousMove() {
    if (moveIndex > 0) {
      game.undo();
      setMoveIndex(moveIndex - 1);
    }
  }

  function handleNextMove() {
    if (moveIndex < moves.length) {
      game.move(moves[moveIndex]);
      setMoveIndex(moveIndex + 1);
    }
  }

  return (
    <div className={colorTheme}>
      <div className="chessboard">
        {gameOver && (
          <div className="game-over-message">
            {gameOverMessage} <br />
            {gameWinner}
          </div>
        )}
        <Chessboard
          animationDuration={200}
          boardOrientation={boardOrientation}
          boardWidth={boardWidth}
          position={game.fen()}
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
          <button className="board-btn" onClick={handlePreviousMove}>
            Previous Move
          </button>
          <button className="board-btn" onClick={handleNextMove}>
            Next Move
          </button>
          <button className="board-btn" onClick={handleAutoPlay}>
            {autoPlay ? "Stop Auto Play" : "Start Auto Play"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReplayBoard;
