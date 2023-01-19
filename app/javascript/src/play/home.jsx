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

function Home() {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [selectedBoard, setSelectedBoard] = useState("DefaultBoard");
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);
  const [colorTheme, setColorTheme] = useState("default");

  const handleColorChange = (e) => {
    const newColor = e.target.value;
    console.log(newColor);
    setColorTheme(newColor);
  };

  const handleMove = (move, color) => {
    if (color === "b") {
      setWhiteMoves([...whiteMoves, move]);
    } else {
      setBlackMoves([...blackMoves, move]);
    }
  };

  useEffect(() => {
    function handleResize() {
      const display = document.getElementsByClassName("chess")[0];
      setChessboardSize(display.offsetWidth - 28);
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
    }
  }

  return (
    <div className={colorTheme}>
      <div className="fix-nav">
        <Navbar colorTheme={colorTheme} />
      </div>
      <div className="spacer"></div>
      <div className="view-port">
        <div className="container">
          <div className="row play-row justify-content-around">
            <div className="chess col-12 col-lg-9 mt-3">
              {getSelectedBoard()}
            </div>
            <div className="btn-col col-12 col-lg-3 mt-3">
              <div className="col-12">
                <ThemePicker
                  colorTheme={colorTheme}
                  handleColorChange={handleColorChange}
                />
              </div>
              <div className="row row-cols-2 row-cols-lg-1">
                <div className="col-12">
                  <h3 className="game-mode-header">Select game mode</h3>
                </div>
                <div className="col-4 col-lg-12">
                  {selectedBoard === "DefaultBoard" ? (
                    <button
                      className="game-btn select-btn active-btn"
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
                      className="game-btn select-btn"
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
                      className="game-btn select-btn active-btn"
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
                      className="game-btn select-btn"
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
                      className="game-btn select-btn active-btn"
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
                      className="game-btn select-btn"
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
                <h3 className="move-history-header">Move History</h3>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <h4 className="color-label">White</h4>
                    <ul className="move-list">
                      {whiteMoves && whiteMoves.length ? (
                        whiteMoves.map((move, index) => {
                          if (move)
                            return (
                              <li className="move" key={index + 1}>
                                {(index + 1) * 2 - 1}.{move.san}
                              </li>
                            );
                          else
                            return (
                              <li className="move" key={index + 1}>
                                null
                              </li>
                            );
                        })
                      ) : (
                        <li className="move"></li>
                      )}
                    </ul>
                  </div>
                  <div className="col-6">
                    <h4 className="color-label">Black</h4>
                    <ul className="move-list">
                      {blackMoves && blackMoves.length ? (
                        blackMoves.map((move, index) => {
                          if (move)
                            return (
                              <li className="move" key={index}>
                                {(index + 1) * 2}.{move.san}
                              </li>
                            );
                          else
                            return (
                              <li className="move" key={index}>
                                null
                              </li>
                            );
                        })
                      ) : (
                        <li className="move"></li>
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
