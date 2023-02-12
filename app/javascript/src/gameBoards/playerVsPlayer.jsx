import React from "react";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { handleErrors } from "../utils/fetchHelper";

import "./board.scss";

export default function PlayerVsPlayer(props) {
  const {
    boardWidth,
    handleMove,
    colorTheme,
    analyze,
    handleMovesHistory,
    moves,
    movesFetched,
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
  const [moveNumber, setMoveNumber] = useState(0);
  const [darkSquareColor, setDarkSquareColor] = useState("#b58863");
  const [lightSquareColor, setLightSquareColor] = useState("#f0d9b5");
  const [user_id, setUserId] = useState(undefined);
  const [game_id, setGameId] = useState(undefined);
  const [white_player_id, setWhitePlayerId] = useState(undefined);
  const [black_player_id, setBlackPlayerId] = useState(undefined);

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

  useEffect(() => {
    getGameInfo();
  }, []);

  useEffect(() => {
    console.log(" make moves");
    console.log(props.moves);
    props.moves.forEach((move) => {
      safeGameMutate(() => game.move(move));
    });
    setGame(game);
  }, [props.moves]);

  useEffect(() => {
    getOrientation();
  }, [user_id]);

  const getGameInfo = () => {
    let path = window.location.pathname;
    let pathArray = path.split("/");
    let gameId = pathArray[2];
    console.log("gameId");
    console.log(gameId);
    setGameId(gameId);

    // Fetch game info (players, etc.)
    fetch(`/api/games/${gameId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving game info");
        }
        return response.json();
      })
      .then((data) => {
        setWhitePlayerId(data.game.player_1_id);
        setBlackPlayerId(data.game.player_2_id);
        console.log("white_player_id and black_player_id");
        console.log(data.game.player_1_id);
        console.log(data.game.player_2_id);

        // Fetch authenticated user ID
        return fetch("/api/sessions/authenticated");
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving user ID");
        }
        return response.json();
      })
      .then((data) => {
        setUserId(data.user_id);
        console.log("user_id");
        console.log(data.user_id);

        // Fetch moves for the game
        return fetch(`/api/games/${gameId}/moves`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving moves for game");
        }
        return response.json();
      })
      .then((data) => {
        props.handleMovesHistory(data.map((move) => move.move));
        console.log("moves");
        console.log(data.map((move) => move.move));
      })
      .catch((error) => {
        handleErrors(error.message);
      });
  };

  const getOrientation = () => {
    if (user_id === white_player_id) {
      console.log("set board white");
      setBoardOrientation("white");
    } else {
      console.log("set board black");
      setBoardOrientation("black");
    }
  };

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
    props.handleMove(move, gameCopy.turn(), game_id);
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
