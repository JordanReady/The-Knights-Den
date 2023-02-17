import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { handleErrors } from "../utils/fetchHelper";

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
    game_id = "",
    gameOverMessage,
    gameWinner,
  } = props;

  const [game, setGame] = useState(new Chess());
  const [boardOrientation, setBoardOrientation] = useState("white");
  const [moveFrom, setMoveFrom] = useState("");
  const [rightClickedSquares, setRightClickedSquares] = useState({});
  const [moveSquares, setMoveSquares] = useState({});
  const [optionSquares, setOptionSquares] = useState({});
  const [analysisOver, setAnalysisOver] = useState(false);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [darkSquareColor, setDarkSquareColor] = useState("#b58863");
  const [lightSquareColor, setLightSquareColor] = useState("#f0d9b5");
  const [moveIndex, setMoveIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);

  const [moves, setMoves] = useState([]);

  useEffect(() => {
    const id = game_id;
    fetch(`/api/games/${id}/moves`)
      .then(handleErrors)
      .then((data) => {
        setMoves(data.map((move) => move.move));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
    let intervalId;
    if (autoPlay) {
      intervalId = setInterval(() => {
        if (moveIndex >= moves.length) {
          clearInterval(intervalId);
          setAutoPlay(false);
          setAnalysisOver(true);
          return;
        }
        setAnalysisOver(false);
        game.move(moves[moveIndex]);
        console.log(moves[moveIndex]);
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
    setAnalysisOver(false);
    if (moveIndex > 0) {
      game.undo();
      setMoveIndex(moveIndex - 1);
    }
  };

  const handleNextMove = () => {
    setAutoPlay(false);
    if (moveIndex < moves.length) {
      console.log(moves[moveIndex]);
      game.move(moves[moveIndex]);
      setMoveIndex(moveIndex + 1);
    } else {
      setAnalysisOver(true);
    }
  };

  const checkMoves = () => {
    console.log(moves);
  };

  const resetAnalysis = () => {
    setGame(new Chess());
    setMoveIndex(0);
    setAnalysisOver(false);
  };

  return (
    <div className={colorTheme}>
      <div className="chessboard">
        {analysisOver && (
          <div className="game-over-message">
            Analysis Over
            <br />
            {gameOverMessage}
            <br />
            {gameWinner}
            <br />
            <button
              className="board-btn"
              onClick={() => {
                resetAnalysis();
              }}
            >
              Restart Analysis
            </button>
            <button
              className="board-btn"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              Return Home
            </button>
            <button
              className="board-btn"
              onClick={() => {
                window.location.href = "/multiplayer";
              }}
            >
              Create New Game
            </button>
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
    </div>
  );
};

export default ReplayBoard;
