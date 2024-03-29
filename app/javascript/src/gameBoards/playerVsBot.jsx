import React from "react";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";
import { handleErrors } from "../utils/fetchHelper";

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
    analyze,
    setReplayGameWinner,
    setReplayGameOverMessage,
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
  const [user_id, setUserId] = useState(undefined);
  const [game_id, setGameId] = useState(undefined);
  const [createBlackGame, setCreateBlackGame] = useState(false);
  const [firstWin, setFirstWin] = useState(false);

  useEffect(() => {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        setUserId(data.user_id);
        createGameWhite(data.user_id);
        return fetch(`/api/users/${data.user_id}/stats`);
      })
      .then(handleErrors)
      .then((data) => {
        console.log(data.stats.wins);
        if (data.stats.wins === 0) {
          setFirstWin(true);
          console.log(firstWin);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (createBlackGame) {
      return createGameBlack(user_id);
    }
  }, [createBlackGame]);

  useEffect(() => {
    // set colors
    if (colorTheme === "blue") {
      setDarkSquareColor("#4682b4");
      setLightSquareColor("#add8e6");
    } else if (colorTheme === "green") {
      setDarkSquareColor("#4f583c");
      setLightSquareColor("#acb192");
    } else if (colorTheme === "red") {
      setDarkSquareColor("#de4d46");
      setLightSquareColor("#efd4cd");
    } else if (colorTheme === "purple") {
      setDarkSquareColor("#61447e");
      setLightSquareColor("#c0b1f4");
    } else {
      setDarkSquareColor("#b58863");
      setLightSquareColor("#f0d9b5");
    }
  }, [colorTheme]);

  useEffect(() => {
    if (playerColor === "b") {
      setTimeout(makeRandomMove, 500);
    }
  }, [playerColor]);

  useEffect(() => {
    const gameCopy = { ...game };
    const turn = gameCopy.turn();
    if (gameCopy.game_over()) {
      setGameOver(true);
      if (game.in_checkmate()) {
        setGameOverMessage("Checkmate! Game over.");
        setReplayGameOverMessage("Checkmate! Game over.");
        if (turn === "w") {
          setGameWinner("Black Wins!");
          setReplayGameWinner("Black Wins!");
        }
        if (turn === "b") {
          setGameWinner("White Wins!");
          setReplayGameWinner("White Wins!");
        }
        if (turn === "w" && playerColor === "w") {
          updateLoss();
        }
        if (turn === "w" && playerColor === "b") {
          updateWin();
        }
        if (turn === "b" && playerColor === "w") {
          updateWin();
        }
        if (turn === "b" && playerColor === "b") {
          updateLoss();
        }
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

  function createGameWhite(id) {
    const bot = 1;

    fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      body: JSON.stringify({
        game: {
          player_1_id: id,
          player_2_id: bot,
        },
      }),
    })
      .then(handleErrors)
      .then((data) => {
        setGameId(data.game.id);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function createGameBlack(id) {
    const bot = 1;

    fetch("/api/games", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      body: JSON.stringify({
        game: {
          player_1_id: bot,
          player_2_id: id,
        },
      }),
    })
      .then(handleErrors)
      .then((data) => {})
      .catch((error) => {
        console.log(error);
      });
  }

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

    handleMove(move, gameCopy.turn(), game_id);
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

  function getPieceType(board, targetSquare) {
    for (let i = 0; i < board.length; i++) {
      let row = board[i];
      for (let j = 0; j < row.length; j++) {
        let piece = row[j];
        if (piece && piece.square === targetSquare) {
          return piece.type;
        }
      }
    }
    return null;
  }

  function makeRandomMove() {
    const possibleMoves = game.moves();
    const gameCopy = { ...game };
    // exit if the player color is making the random move
    if (playerColor === gameCopy.turn()) return;

    // exit if the game is over
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0)
      return;

    // Check if there is a checkmate move
    const checkmates = possibleMoves.filter(function (move) {
      return move.includes("#");
    });

    let move;
    // if there is a checkmate move, make that move
    if (checkmates.length > 0) {
      move = checkmates[Math.floor(Math.random() * checkmates.length)];
    } else {
      // Filter moves that capture pieces with pawns
      var pawnCaptures = possibleMoves.filter(function (move) {
        if (!move.includes("x")) {
          return false;
        }
        let targetSquare = move.substr(move.indexOf("x") + 1);
        let pieceType = getPieceType(game.board(), targetSquare);
        if (pieceType === "q") {
          return true;
        } else if (pieceType === "r") {
          return true;
        } else if (pieceType === "n" || pieceType === "b") {
          return true;
        } else if (pieceType === "p") {
          return true;
        } else {
          return false;
        }
      });

      // if there are pawn capture moves, make one of those
      if (pawnCaptures.length > 0) {
        move = pawnCaptures[Math.floor(Math.random() * pawnCaptures.length)];
      } else {
        // Filter moves that capture pieces
        var captures = possibleMoves.filter(function (move) {
          return move.includes("x");
        });

        // Create an array of moves with more of the captures
        var betterMoves = [];
        for (var i = 0; i < captures.length; i++) {
          betterMoves.push(captures[i]);
          betterMoves.push(captures[i]);
          betterMoves.push(captures[i]);
          betterMoves.push(captures[i]);
          betterMoves.push(captures[i]);
        }

        // Add the other possible moves to the betterMoves array
        for (var i = 0; i < possibleMoves.length; i++) {
          if (!possibleMoves[i].includes("x")) {
            betterMoves.push(possibleMoves[i]);
          }
        }

        //if there are better moves, make one of those
        if (betterMoves.length > 0) {
          move = betterMoves[Math.floor(Math.random() * betterMoves.length)];
        } else {
          move =
            possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        }
      }
    }

    safeGameMutate((game) => {
      const moveObj = game.move(move);

      handleMove(moveObj, gameCopy.turn(), game_id);
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

  const reset = () => {
    setGame(new Chess());
    setBoardOrientation("white");
    setCurrentTimeout(null);
    setMoveFrom("");
    setRightClickedSquares({});
    setMoveSquares({});
    setOptionSquares({});
    setGameOver(false);
    setGameOverMessage("");
    setGameWinner("");
    setMoveNumber(0);
    setSelectedPiece(null);
    setBlackMoves([]);
    setWhiteMoves([]);
    setPlayerColor("w");
    fetch(`/api/games/${game_id}/moves/reset_moves`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
      },
    }).then((res) => res.json());
  };

  const undo = () => {
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
    fetch(`/api/games/${game_id}/moves/delete_last_move`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
          .content,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  const playWhite = () => {
    setPlayerColor("w");
    setCreateBlackGame(false);
    game.reset();
    safeGameMutate((game) => {
      setGameOver(false);
      setMoveNumber(0);
      setWhiteMoves([]);
      setBlackMoves([]);
      setBoardOrientation("white");
    });
  };

  const playBlack = () => {
    reset();
    setPlayerColor("b");
    setBoardOrientation("black");
    setTimeout(makeRandomMove, 500);
    setCreateBlackGame(true);
  };

  return (
    <>
      <div className="chessboard">
        {gameOver && !firstWin && (
          <div className="game-over-message">
            {gameOverMessage} <br />
            {gameWinner}
            <br />
            <button className="board-btn" onClick={() => analyze(game_id)}>
              Analyze Game
            </button>
          </div>
        )}
        {gameOver && firstWin && (
          <div className="game-over-message">
            {gameOverMessage} <br />
            {gameWinner}
            <br />
            Congrats on your first <br />
            win in the Knights Den! <br />
            <button className="board-btn" onClick={() => analyze(game_id)}>
              Analyze Game
            </button>
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
              reset();
            }}
          >
            Reset
          </button>
          <button
            className="board-btn"
            onClick={() => {
              undo();
            }}
          >
            Undo
          </button>
          <button
            className="board-btn"
            onClick={() => {
              playWhite();
            }}
          >
            Play White
          </button>
          <button
            className="board-btn"
            onClick={() => {
              playBlack();
            }}
          >
            Play Black
          </button>
        </div>
      </div>
    </>
  );
}
