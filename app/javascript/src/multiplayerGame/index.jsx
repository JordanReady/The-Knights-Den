import React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import { handleErrors } from "../utils/fetchHelper";
import MultiplayerControls from "./multiplayerControls";
import PlayerVsPlayer from "../gameBoards/playerVsPlayer";
import ReplayBoard from "../gameBoards/replayBoard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./multiplayerGame.scss";

function Index() {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [selectedBoard, setSelectedBoard] = useState("PlayerVsPlayer");
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);
  const [colorTheme, setColorTheme] = useState("default");
  const [game_id, setGameId] = useState(undefined);
  const [user_id, setUserId] = useState(undefined);
  const [moves, setMoves] = useState([]);
  const [movesFetched, setMovesFetched] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [winner, setWinner] = useState(undefined);
  const [message, setMessage] = useState(undefined);

  const handleMovesHistory = (moves) => {
    setMoves((prevMoves) => [...prevMoves, ...moves]);
    setMovesFetched(true);
  };

  useEffect(() => {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        setAuthenticated(data.authenticated);
        setUserId(data.user_id);
        return fetch(`/api/users/${data.user_id}/color_theme`);
      })
      .then(handleErrors)
      .then((data) => {
        setColorTheme(data.color_theme);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    // set white and black moves from moves
    const whiteMoves = [];
    const blackMoves = [];
    moves.forEach((move, index) => {
      if (index % 2 === 0) {
        whiteMoves.push(move);
      } else {
        blackMoves.push(move);
      }
    });
    setWhiteMoves(whiteMoves);
    setBlackMoves(blackMoves);
  }, [moves]);

  useEffect(() => {
    function handleResize() {
      const display = document.getElementsByClassName("chess")[0];
      setChessboardSize(display.clientWidth - 28);
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const element = document.getElementsByClassName("move-list")[0];
    const element2 = document.getElementsByClassName("move-list")[1];
    if (element.scrollHeight > element.clientHeight) {
      element.scrollTop = element.scrollHeight;
    }
    if (element2.scrollHeight > element2.clientHeight) {
      element2.scrollTop = element2.scrollHeight;
    }
  }, [whiteMoves, blackMoves]);

  function getSelectedBoard() {
    switch (selectedBoard) {
      case "PlayerVsPlayer":
        return (
          <>
            <PlayerVsPlayer
              boardWidth={chessboardSize}
              handleMove={handleMove}
              colorTheme={colorTheme}
              setColorTheme={setColorTheme}
              handleMovesHistory={handleMovesHistory}
              analyze={analyze}
              moves={moves}
              movesFetched={movesFetched}
            />
            <br />
          </>
        );
      case "ReplayBoard":
        return (
          <>
            <ReplayBoard
              boardWidth={chessboardSize}
              whiteMoves={whiteMoves}
              blackMoves={blackMoves}
              setWhiteMoves={setWhiteMoves}
              setBlackMoves={setBlackMoves}
              handleMove={handleMove}
              colorTheme={colorTheme}
              setColorTheme={setColorTheme}
              game_id={game_id}
              gameOverMessage={message}
              gameWinner={winner}
            />
            <br />
          </>
        );
    }
  }

  const analyze = (game_id, gameOverMessage, gameWinner) => {
    setGameId(game_id);
    setMessage(gameOverMessage);
    setWinner(gameWinner);
    console.log(game_id);
    console.log(gameOverMessage);
    console.log(gameWinner);
    setSelectedBoard("ReplayBoard");
  };

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    console.log(newColor);
    setColorTheme(newColor);
    const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
    fetch(`/api/users/${user_id}/color_theme`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({
        user: {
          color_theme: newColor,
        },
      }),
    })
      .then(handleErrors)
      .then((data) => {
        console.log(data);
      });
  };

  const handleMove = (move, color, game_id) => {
    //add move to moves
    setMoves((prevMoves) => [...prevMoves, move.san]);
    //if game_id is not undefined run the fetch
    if (game_id) {
      fetch(`/api/games/${game_id}/moves`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content"),
        },
        body: JSON.stringify({
          move: {
            move: move.san,
          },
        }),
      })
        .then(handleErrors)
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className={colorTheme}>
      <div className="fix-nav">
        <Navbar colorTheme={colorTheme} authenticated={authenticated} />
      </div>
      <div className="spacer"></div>
      <div className="view-port">
        <div className="container">
          <div className="row play-row justify-content-around">
            <div className="chess col-12 col-lg-9">{getSelectedBoard()}</div>
            <MultiplayerControls
              colorTheme={colorTheme}
              handleColorChange={handleColorChange}
              whiteMoves={whiteMoves}
              blackMoves={blackMoves}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Index />,
    document.body.appendChild(document.createElement("div"))
  );
});
