import React from "react";
import { useEffect, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { handleErrors } from "../utils/fetchHelper";

import "./board.scss";

// subscribe to actioncable game room
import { createConsumer } from "@rails/actioncable";
const cable = createConsumer();

function subscribeToGameRoom(game_id, setData) {
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
          console.log("Move received");
          setData(data);
        } else if (data.type === "UPDATE_DRAW") {
          console.log("Draw received");
          setData(data);
        } else if (data.type === "UPDATE_RESIGNATION") {
          console.log("Resignation received");
          setData(data);
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
  const [drawReceived, setDrawReceived] = useState(false);
  const [whitePlayerDraw, setWhitePlayerDraw] = useState(false);
  const [blackPlayerDraw, setBlackPlayerDraw] = useState(false);
  const [draw, setDraw] = useState(false);
  const [waitingForDraw, setWaitingForDraw] = useState(false);
  const [resignOffered, setResignOffered] = useState(false);
  const [resign, setResign] = useState(false);
  const [data, setData] = useState({});
  const [gameCompleted, setGameCompleted] = useState(false);
  const [whitePlayerResigned, setWhitePlayerResigned] = useState(false);
  const [blackPlayerResigned, setBlackPlayerResigned] = useState(false);

  useEffect(() => {
    //handle data from actioncable
    if (data.type === "UPDATE_MOVE") {
      console.log("Updating move...");
      handleUpdateMove(data);
    } else if (data.type === "UPDATE_DRAW") {
      console.log("Updating draw...");
      handleUpdateDraw(data);
    } else if (data.type === "UPDATE_RESIGNATION") {
      console.log("Updating resign...");
      handleUpdateResignation(data);
    }
  }, [data]);

  //check for drawn game or resignation
  useEffect(() => {
    if (whitePlayerResigned) {
      setGameOver(true);
      setGameOverMessage("Game over!");
      setGameWinner("Black wins by resignation!");
      console.log("white resigned");
    }
    if (blackPlayerResigned) {
      setGameOver(true);
      setGameOverMessage("Game over!");
      setGameWinner("White wins by resignation!");
      console.log("black resigned");
    }
    if (whitePlayerDraw && blackPlayerDraw) {
      setWaitingForDraw(false);
      setDraw(true);
      setDrawOffered(false);
      setDrawReceived(false);
      setGameOver(true);
      setGameOverMessage("Draw!");
      setGameWinner("Game over!");
      updateDraw(whitePlayerId);
      updateDraw(blackPlayerId);
    }
  }, [
    whitePlayerDraw,
    blackPlayerDraw,
    gameCompleted,
    whitePlayerResigned,
    blackPlayerResigned,
  ]);

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
  //check for game over
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

  //get game info
  useEffect(() => {
    getGameInfo();
  }, []);

  //make moves when props.moves changes
  useEffect(() => {
    console.log(" make moves");
    console.log(props.moves);
    props.moves.forEach((move) => {
      game.move(move);
    });
    setGame(game);
  }, [props.moves]);

  //set orientation of board for current player
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
        setGameCompleted(data.game.game_over);
        setGameOver(data.game.game_over);
        setWhitePlayerResigned(data.game.player_1_resigned);
        setBlackPlayerResigned(data.game.player_2_resigned);
        console.log(data);
        console.log("whitePlayerId and blackPlayerId");
        console.log(data.game.player_1_id);
        console.log(data.game.player_2_id);
        console.log("gameCompleted?");
        console.log(data.game.game_over);
        console.log(gameCompleted);
        console.log("whitePlayerResigned?");
        console.log(data.game.player_1_resigned);
        console.log("blackPlayerResigned?");
        console.log(data.game.player_2_resigned);

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
        // Subscribe to game room
        subscribeToGameRoom(data.game.id, setData);
      })
      .catch((error) => {
        handleErrors(error.message);
      });
  };

  function handleUpdateDraw(data) {
    let whitePlayerDraw = data.game.player_1_draw_offer;
    let blackPlayerDraw = data.game.player_2_draw_offer;
    let currentPlayerColor;
    console.log("whitePlayerDraw and blackPlayerDraw");
    console.log(whitePlayerDraw + " " + blackPlayerDraw);
    if (userId === whitePlayerId) {
      currentPlayerColor = "white";
    } else {
      currentPlayerColor = "black";
    }
    if (whitePlayerDraw && blackPlayerDraw) {
      setGameOver(true);
      setGameOverMessage("Draw!");
      setGameWinner("Game over!");
      updateDraw();
    } else if (whitePlayerDraw && currentPlayerColor === "white") {
      setDrawOffered(false);
    } else if (blackPlayerDraw && currentPlayerColor === "black") {
      setDrawOffered(false);
    } else if (whitePlayerDraw && currentPlayerColor === "black") {
      setDrawReceived(true);
    } else if (blackPlayerDraw && currentPlayerColor === "white") {
      setDrawReceived(true);
    } else {
      console.log("no draw");
      setWaitingForDraw(false);
      setDrawOffered(false);
      setDrawReceived(false);
    }
  }

  function handleUpdateMove(data) {
    let recievedMove = data.moves.slice(-1)[0].move;
    console.log("recieved move");
    console.log(recievedMove);
    const gameCopy = { ...game };
    gameCopy.move(recievedMove);
    setGame(gameCopy);
  }

  function handleUpdateResignation(data) {
    let whitePlayerResignation = data.game.player_1_resigned;
    let blackPlayerResignation = data.game.player_2_resigned;
    console.log("whitePlayerResignation and blackPlayerResignation");
    console.log(whitePlayerResignation + " " + blackPlayerResignation);
    //iif either player has resigned, game is over
    if (whitePlayerResignation === true) {
      setGameOver(true);
      setGameOverMessage("White resigned!");
      setGameWinner("Black wins!");
    }
    if (blackPlayerResignation === true) {
      setGameOver(true);
      setGameOverMessage("Black resigned!");
      setGameWinner("White wins!");
    }
  }

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
    setDrawOffered(false);
    setDrawReceived(false);
    setWaitingForDraw(false);
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
      updateDraw(userId);
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

  function resetDrawOffer() {
    fetch(`/api/games/${gameId}/reset_draw`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
      },
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
                setWaitingForDraw(true);
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
        {waitingForDraw && (
          <div className="game-over-message">
            Waiting for opponent!
            <br />
            Game will continue if opponent declines!
          </div>
        )}
        {drawReceived && (
          <div className="game-over-message">
            Would you like to accept a draw?
            <br />
            <button
              className="board-btn"
              onClick={() => {
                console.log("accept draw");
                setDrawReceived(false);
                setWaitingForDraw(false);
                setDrawOffered(false);
                setGameOver(true);
                setGameOverMessage("Draw");
                updatePlayerDraw();
                updateDraw();
              }}
            >
              Accept
            </button>
            <button
              className="board-btn"
              onClick={() => {
                console.log("reject draw");
                setDrawReceived(false);
                resetDrawOffer();
                setWaitingForDraw(false);
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
        </div>
      </div>
    </>
  );
}
