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
    "d6",
    "d4",
    "Bg4",
    "dxe5",
    "Bxf3",
    "Qxf3",
    "dxe5",
    "Bc4",
    "Nf6",
    "Qb3",
    "Qe7",
    "Nc3",
    "c6",
    "Bg5",
    "b5",
    "Nxb5",
    "cxb5",
    "Bxb5+",
    "Nbd7",
    "O-O-O",
    "Rd8",
    "Rxd7",
    "Rxd7",
    "Rd1",
    "Qe6",
    "Bxd7+",
    "Nxd7",
    "Qb8+",
    "Nxb8",
    "Rd8#",
  ];

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
    console.log(gameCopy + "is game over? " + gameOver);
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
    let intervalId;
    if (autoPlay) {
      intervalId = setInterval(() => {
        if (moveIndex >= moves.length) {
          clearInterval(intervalId);
          setAutoPlay(false);
          return;
        }
        game.move(moves[moveIndex]);
        if (moveIndex % 2 === 0) {
          setWhiteMoves((prevMoves) => [...prevMoves, moves[moveIndex]]);
        } else {
          setBlackMoves((prevMoves) => [...prevMoves, moves[moveIndex]]);
        }
        setMoveIndex(moveIndex + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [autoPlay, moveIndex]);

  const handleAutoPlay = () => {
    setAutoPlay(!autoPlay);
  };

  const handlePreviousMove = () => {
    setAutoPlay(false);
    if (moveIndex > 0) {
      game.undo();
      if (moveIndex % 2 === 0) {
        setBlackMoves((prevMoves) => {
          const newMoves = [...prevMoves];
          newMoves.pop();
          return newMoves;
        });
      } else {
        setWhiteMoves((prevMoves) => {
          const newMoves = [...prevMoves];
          newMoves.pop();
          return newMoves;
        });
      }
      setMoveIndex(moveIndex - 1);
    }
  };

  const handleNextMove = () => {
    setAutoPlay(false);
    if (moveIndex < moves.length - 1) {
      game.move(moves[moveIndex]);
      if (moveIndex % 2 === 0) {
        setWhiteMoves((prevMoves) => [...prevMoves, moves[moveIndex]]);
      } else {
        setBlackMoves((prevMoves) => [...prevMoves, moves[moveIndex]]);
      }
      setMoveIndex(moveIndex + 1);
    }
  };

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
