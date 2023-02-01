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

function Home() {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [selectedBoard, setSelectedBoard] = useState("DefaultBoard");
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);
  const [colorTheme, setColorTheme] = useState("default");
  const [authenticated, setAuthenticated] = useState(false);
  const [user_id, setUserId] = useState(undefined);

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

  const handleMove = (move, color) => {
    if (color === "b") {
      setWhiteMoves([...whiteMoves, move]);
    } else {
      setBlackMoves([...blackMoves, move]);
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
            <div className="btn-col col-12 col-lg-3">
              <div className="col-12 btn-col-el">
                <ThemePicker
                  colorTheme={colorTheme}
                  handleColorChange={handleColorChange}
                />
              </div>
              <div className="row row-cols-2 row-cols-lg-1">
                <div className="col-12">
                  <h3 className="game-mode-header btn-col-el">
                    Select game mode
                  </h3>
                </div>
                <div className="col-4 col-lg-12">
                  {selectedBoard === "DefaultBoard" ? (
                    <button
                      className="game-btn select-btn active-btn btn-col-el"
                      onClick={() => {
                        setSelectedBoard("DefaultBoard");
                        setBlackMoves([]);
                        setWhiteMoves([]);
                      }}
                    >
                      Practice Board
                    </button>
                  ) : (
                    <button
                      className="game-btn select-btn btn-col-el"
                      onClick={() => {
                        setSelectedBoard("DefaultBoard");
                        setBlackMoves([]);
                        setWhiteMoves([]);
                      }}
                    >
                      Practice Board
                    </button>
                  )}
                </div>
                <div className="col-4 col-lg-12">
                  {selectedBoard === "PlayerVsBot" ? (
                    <button
                      className="game-btn select-btn active-btn btn-col-el"
                      onClick={() => {
                        setSelectedBoard("PlayerVsBot");
                        setBlackMoves([]);
                        setWhiteMoves([]);
                      }}
                    >
                      Player vs Bot
                    </button>
                  ) : (
                    <button
                      className="game-btn select-btn btn-col-el"
                      onClick={() => {
                        setSelectedBoard("PlayerVsBot");
                        setBlackMoves([]);
                        setWhiteMoves([]);
                      }}
                    >
                      Player vs Bot
                    </button>
                  )}
                </div>
                <div className="col-4 col-lg-12">
                  {selectedBoard === "PlayerVsPlayer" ? (
                    <button
                      className="game-btn select-btn active-btn btn-col-el"
                      onClick={() => {
                        setSelectedBoard("PlayerVsPlayer");
                        setBlackMoves([]);
                        setWhiteMoves([]);
                      }}
                    >
                      Player vs Player
                    </button>
                  ) : (
                    <button
                      className="game-btn select-btn btn-col-el"
                      onClick={() => {
                        setSelectedBoard("PlayerVsPlayer");
                        setBlackMoves([]);
                        setWhiteMoves([]);
                      }}
                    >
                      Player vs Player
                    </button>
                  )}
                </div>
              </div>
              <div className="col-12">
                <h3 className="move-history-header btn-col-el">Move History</h3>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <h4 className="color-label btn-col-el">White</h4>
                    <ul className="move-list">
                      {whiteMoves && whiteMoves.length ? (
                        whiteMoves.map((move, index) => {
                          if (move)
                            return (
                              <li className="move btn-col-el" key={index + 1}>
                                {(index + 1) * 2 - 1}.{move.san}
                              </li>
                            );
                          else
                            return (
                              <li className="move btn-col-el" key={index + 1}>
                                null
                              </li>
                            );
                        })
                      ) : (
                        <li className="move btn-col-el"></li>
                      )}
                    </ul>
                  </div>
                  <div className="col-6">
                    <h4 className="color-label btn-col-el">Black</h4>
                    <ul className="move-list">
                      {blackMoves && blackMoves.length ? (
                        blackMoves.map((move, index) => {
                          if (move)
                            return (
                              <li className="move btn-col-el" key={index}>
                                {(index + 1) * 2}.{move.san}
                              </li>
                            );
                          else
                            return (
                              <li className="move btn-col-el" key={index}>
                                null
                              </li>
                            );
                        })
                      ) : (
                        <li className="move btn-col-el"></li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
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
