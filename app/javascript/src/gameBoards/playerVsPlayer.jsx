import React from "react";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";

import "./board.scss";

export default function PlayerVsPlayer(props) {
  const {
    boardWidth,
    whiteMoves = [],
    setWhiteMoves,
    blackMoves = [],
    setBlackMoves,
    handleMove,
    colorTheme,
    analyze,
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
  const [moveNumber, setMoveNumber] = useState(0);
  const [darkSquareColor, setDarkSquareColor] = useState("#b58863");
  const [lightSquareColor, setLightSquareColor] = useState("#f0d9b5");
  const [user_id, setUserId] = useState(undefined);
  const [game_id, setGameId] = useState(undefined);

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
      } else if (game.in_stalemate()) {
        setGameOverMessage("Stalemate! Game over.");
        updateDraw();
      } else if (game.insufficient_material()) {
        setGameOverMessage("Insufficient material! Game over.");
        updateDraw();
      } else if (game.in_threefold_repetition()) {
        setGameOverMessage("Threefold repetition! Game over.");
        updateDraw();
      } else if (game.in_draw()) {
        setGameOverMessage("Draw! Game over.");
        updateDraw();
      }
    }
    setMoveNumber(moveNumber + 1);
  }, [game]);

  function updateDraw() {
    setTimeout(() => {
      fetch(`/api/users/${user_id}/stats/draw`)
        .then(handleErrors)
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }

  function updateWin() {
    setTimeout(() => {
      fetch(`/api/users/${user_id}/stats/win`)
        .then(handleErrors)
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }

  function updateLoss() {
    setTimeout(() => {
      fetch(`/api/users/${user_id}/stats/loss`)
        .then(handleErrors)
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }

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
    handleMove(move, gameCopy.turn(), game_id);
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

  function getMoveOptions(square) {
    const gameCopy = { ...game };
    const moves = gameCopy.moves({ square, verbose: true });
    const squaresToHighlight = {};
    for (let i = 0; i < moves.length; i++) {
      squaresToHighlight[moves[i].to] = {
        backgroundColor: "rgba(255, 255, 0, 0.4)",
      };
    }
    setOptionSquares(squaresToHighlight);
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
          id="PlayerVsPlayer"
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
