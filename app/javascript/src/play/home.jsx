import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import DefaultBoard from "../gameBoards/defaultBoard";
import PlayerVsBot from "../gameBoards/playerVsBot";
import PlayerVsPlayer from "../gameBoards/playerVsPlayer";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./home.scss";
import ThemePicker from "../themePicker/themePicker";
import ReplayBoard from "../gameBoards/replayBoard";
import { handleErrors, safeCredentials } from "../utils/fetchHelper";
import PlayControls from "./playControls";

function Home() {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [selectedBoard, setSelectedBoard] = useState("DefaultBoard");
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);
  const [colorTheme, setColorTheme] = useState("default");
  const [authenticated, setAuthenticated] = useState(false);
  const [user_id, setUserId] = useState(undefined);
  const [game_id, setGameId] = useState(undefined);
  const [replayGameWinner, setReplayGameWinner] = useState(undefined);
  const [replayGameOverMessage, setReplayGameOverMessage] = useState(undefined);

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

  const analyze = (game_id) => {
    setGameId(game_id);
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
    if (color === "b") {
      setWhiteMoves([...whiteMoves, move]);
    } else {
      setBlackMoves([...blackMoves, move]);
    }
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

  function getSelectedBoard() {
    switch (selectedBoard) {
      case "DefaultBoard":
        return (
          <>
            <DefaultBoard
              boardWidth={chessboardSize}
              whiteMoves={whiteMoves}
              blackMoves={blackMoves}
              setWhiteMoves={setWhiteMoves}
              setBlackMoves={setBlackMoves}
              handleMove={handleMove}
              colorTheme={colorTheme}
              setColorTheme={setColorTheme}
            />
            <br />
          </>
        );
      case "PlayerVsBot":
        return (
          <>
            <PlayerVsBot
              boardWidth={chessboardSize}
              whiteMoves={whiteMoves}
              blackMoves={blackMoves}
              setWhiteMoves={setWhiteMoves}
              setBlackMoves={setBlackMoves}
              handleMove={handleMove}
              colorTheme={colorTheme}
              setColorTheme={setColorTheme}
              analyze={analyze}
              setReplayGameOverMessage={setReplayGameOverMessage}
              setReplayGameWinner={setReplayGameWinner}
            />
            <br />
          </>
        );
      case "PlayerVsPlayer":
        return (
          <>
            <PlayerVsPlayer
              boardWidth={chessboardSize}
              whiteMoves={whiteMoves}
              blackMoves={blackMoves}
              setWhiteMoves={setWhiteMoves}
              setBlackMoves={setBlackMoves}
              handleMove={handleMove}
              colorTheme={colorTheme}
              setColorTheme={setColorTheme}
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
              gameWinner={replayGameWinner}
              gameOverMessage={replayGameOverMessage}
            />
            <br />
          </>
        );
    }
  }

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
            <PlayControls
              colorTheme={colorTheme}
              handleColorChange={handleColorChange}
              selectedBoard={selectedBoard}
              setSelectedBoard={setSelectedBoard}
              setBlackMoves={setBlackMoves}
              setWhiteMoves={setWhiteMoves}
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
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});
