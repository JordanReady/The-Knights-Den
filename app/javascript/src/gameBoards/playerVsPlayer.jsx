import React from "react";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { handleErrors } from "../utils/fetchHelper";

import "./board.scss";

// subscribe to actioncable game room
import { createConsumer } from "@rails/actioncable";
const cable = createConsumer();

function subscribeToGameRoom(
  game_id,
  setDrawOffered,
  setGameOver,
  setResignOffered,
  setGame,
  game
) {
  cable.subscriptions.create(
    { channel: "GameChannel", game_id: game_id },
    {
      connected() {
        // Called when the subscription is ready for use on the server
        console.log(`Connected to the game channel with game_id=${game_id}!`);
      },

      disconnected() {
        // Called when the subscription has been terminated by the server
        console.log(
          `Disconnected from the game channel with game_id=${game_id}!`
        );
      },

      received(data) {
        // Called when there's incoming data on the websocket for this channel
        console.log(
          `Received data from the game channel with game_id=${game_id}!`,
          data
        );
        // update the move if the data type is move
        if (data.type === "UPDATE_MOVE") {
          console.log("Updating move...");
          // update the move
          // get the last move in the array
          const move = data.moves.slice(-1)[0].move;
          console.log(move);
          const gameCopy = { ...game };
          gameCopy.move(move);
          setGame(gameCopy);
        } else if (data.type === "UPDATE_DRAW") {
          console.log("Updating draw...");
          // update the draw
          let player_1_draw_offer = data.game.player_1_draw_offer;
          let player_2_draw_offer = data.game.player_2_draw_offer;
          console.log("white draw:", player_1_draw_offer);
          console.log("black draw:", player_2_draw_offer);
          // set the draw offered state
          setDrawOffered(true);
          console.log("draw offered:");
        } else if (data.type === "UPDATE_RESIGNATION") {
          console.log("Updating resign...");
          // update the resign
          let player_1_resigned = data.game.player_1_resigned;
          let player_2_resigned = data.game.player_2_resigned;

          console.log("white resigned:", player_1_resigned);
          console.log("black resigned:", player_2_resigned);
          console.log("game over:", data.game.game_over);
        }
      },
    }
  );
}

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
  const [userId, setUserId] = useState(undefined);
  const [gameId, setGameId] = useState(undefined);
  const [whitePlayerId, setWhitePlayerId] = useState(undefined);
  const [blackPlayerId, setBlackPlayerId] = useState(undefined);
  const [drawOffered, setDrawOffered] = useState(false);
  const [whitePlayerDraw, setWhitePlayerDraw] = useState(false);
  const [blackPlayerDraw, setBlackPlayerDraw] = useState(false);
  const [draw, setDraw] = useState(false);
  const [resignOffered, setResignOffered] = useState(false);
  const [resign, setResign] = useState(false);

  useEffect(() => {
    if (whitePlayerDraw && blackPlayerDraw) {
      setGameOver(true);
      setGameOverMessage("Draw!");
      setGameWinner("Game over.");
      updateDraw(whitePlayerId);
      setTimeout(() => {
        updateDraw(blackPlayerId);
      }, 500);
    }
  }, [whitePlayerDraw, blackPlayerDraw]);

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
          setGameWinner("Black wins!");
          updateWin(blackPlayerId);
          setTimeout(() => {
            updateLoss(whitePlayerId);
          }, 500);
        } else {
          setGameWinner("White wins!");
          updateWin(whitePlayerId);
          setTimeout(() => {
            updateLoss(blackPlayerId);
          }, 500);
        }
      } else if (game.in_stalemate()) {
        setGameOverMessage("Stalemate! Game over.");
        updateDraw(whitePlayerDraw);
        setTimeout(() => {
          updateDraw(blackPlayerDraw);
        }, 500);
      } else if (game.insufficient_material()) {
        setGameOverMessage("Insufficient material! Game over.");
        updateDraw(whitePlayerDraw);
        setTimeout(() => {
          updateDraw(blackPlayerDraw);
        }, 500);
      } else if (game.in_threefold_repetition()) {
        setGameOverMessage("Threefold repetition! Game over.");
        updateDraw(whitePlayerDraw);
        setTimeout(() => {
          updateDraw(blackPlayerDraw);
        }, 500);
      } else if (game.in_draw()) {
        setGameOverMessage("Draw! Game over.");
        updateDraw(whitePlayerDraw);
        setTimeout(() => {
          updateDraw(blackPlayerDraw);
        }, 500);
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
      game.move(move);
    });
    setGame(game);
  }, [props.moves]);

  useEffect(() => {
    getOrientation();
  }, [userId]);

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
        console.log("whitePlayerId and blackPlayerId");
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
        return fetch(`/api/games/${gameId}`);
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error retrieving game info");
        }
        return response.json();
      })
      .then((data) => {
        console.log("game info");
        console.log(data);
        setWhitePlayerDraw(data.game.player_1_draw_offer);
        setBlackPlayerDraw(data.game.player_2_draw_offer);
        console.log("whitePlayerDraw and blackPlayerDraw");
        console.log(whitePlayerDraw + " " + blackPlayerDraw);

        subscribeToGameRoom(
          data.game.id,
          setDrawOffered,
          setGameOver,
          setResignOffered,
          setGame,
          game
        );
      })
      .catch((error) => {
        handleErrors(error.message);
      });
  };

  const getOrientation = () => {
    if (userId === whitePlayerId) {
      console.log("set board white");
      setBoardOrientation("white");
    } else {
      console.log("set board black");
      setBoardOrientation("black");
    }
  };

  function updateDraw(id) {
    setTimeout(() => {
      fetch(`/api/users/${id}/stats/draw`)
        .then(handleErrors)
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }

  function updateWin(id) {
    setTimeout(() => {
      fetch(`/api/users/${id}/stats/win`)
        .then(handleErrors)
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }

  function updateLoss(id) {
    setTimeout(() => {
      fetch(`/api/users/${id}/stats/loss`)
        .then(handleErrors)
        .then((data) => {})
        .catch((error) => {
          console.log(error);
        });
    }, 1000);
  }

  function onDrop(sourceSquare, targetSquare) {
    // check whos turn it is and only allow them to move if its their turn
    if (game.turn() === "w" && userId !== whitePlayerId) {
      return false;
    } else if (game.turn() === "b" && userId !== blackPlayerId) {
      return false;
    } else {
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
      props.handleMove(move, gameCopy.turn(), gameId);
      return true;
    }
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
    if (game.turn() === "w" && userId !== whitePlayerId) {
      return false;
    } else if (game.turn() === "b" && userId !== blackPlayerId) {
      return false;
    } else {
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
      handleMove(move, gameCopy.turn(), gameId);
      setMoveFrom("");
      setOptionSquares({});
    }
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

  function updatePlayerDraw() {
    //check if user is white or black
    if (userId === whitePlayerId) {
      setWhitePlayerDraw(true);
      fetch(`/api/games/${gameId}/offer_draw`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
          user_id: userId,
          whitePlayerDraw: true,
        }),
      })
        .then(handleErrors)
        .then((data) => {
          console.log("data");
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setBlackPlayerDraw(true);
      fetch(`/api/games/${gameId}/offer_draw`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
          user_id: userId,
          blackPlayerDraw: true,
        }),
      })
        .then(handleErrors)
        .then((data) => {
          console.log("data");
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    //check if both players have offered a draw
    if (whitePlayerDraw && blackPlayerDraw) {
      setGameOver(true);
      setGameOverMessage("Draw");
      updateDraw();
    }
  }

  function switchId() {
    if (userId === whitePlayerId) {
      setUserId(blackPlayerId);
    } else {
      setUserId(whitePlayerId);
    }
    console.log("switched id");
    console.log(userId);
    console.log(whitePlayerDraw + " " + blackPlayerDraw);
  }

  function createNewGame() {
    // redirect to create new game
    window.location.href = "/multiplayer";
  }

  function setUserResign() {
    fetch(`/api/games/${gameId}/resignation`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
      body: JSON.stringify({
        user_id: userId,
      }),
    })
      .then(handleErrors)
      .then((data) => {
        console.log("data");
        console.log(data);
      });
  }

  return (
    <>
      <div className="chessboard">
        {gameOverMessage && (
          <div className="game-over-message">
            {gameOverMessage} <br />
            {gameWinner}
            <br />
            <button
              className="board-btn"
              onClick={() => props.analyze(gameId, gameOverMessage, gameWinner)}
            >
              Analyze Game
            </button>
            <button className="board-btn" onClick={() => createNewGame()}>
              New Game
            </button>
          </div>
        )}
        {drawOffered && (
          <div className="game-over-message">
            Would you like to offer a draw?
            <br />
            <button
              className="board-btn"
              onClick={() => {
                console.log("accept draw");
                setDrawOffered(false);
                updatePlayerDraw();
              }}
            >
              Accept
            </button>
            <button
              className="board-btn"
              onClick={() => {
                console.log("reject draw");
                setDrawOffered(false);
              }}
            >
              Reject
            </button>
          </div>
        )}
        {resignOffered && (
          <div className="game-over-message">
            Would you like to resign?
            <br />
            <button
              className="board-btn"
              onClick={() => {
                let user = "";
                if (userId === whitePlayerId) {
                  user = "White";
                } else {
                  user = "Black";
                }
                setResignOffered(false);
                setUserResign();
                setGameOver(true);
                setGameOverMessage(user + " Resigns");
                setGameWinner(user === "White" ? "Black Wins" : "White Wins");
                updateLoss(userId);
                setTimeout(() => {
                  if (userId === whitePlayerId) {
                    updateWin(blackPlayerId);
                    setGameWinner("Black Wins");
                  }
                  if (userId === blackPlayerId) {
                    updateWin(whitePlayerId);
                    setGameWinner("White Wins");
                  }
                }, 1000);
              }}
            >
              Accept
            </button>
            <button
              className="board-btn"
              onClick={() => {
                console.log("reject draw");
                setResignOffered(false);
              }}
            >
              Reject
            </button>
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
              console.log("offer draw");
              setDrawOffered(true);
            }}
          >
            Offer Draw
          </button>
          <button
            className="board-btn"
            onClick={() => {
              console.log("resign");
              setResignOffered(true);
            }}
          >
            Resign
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
          <button
            className="board-btn"
            onClick={() => {
              switchId();
            }}
          >
            Switch id
          </button>
        </div>
      </div>
    </>
  );
}
