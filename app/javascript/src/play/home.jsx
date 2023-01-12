import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import DefaultBoard from "../gameBoards/defaultBoard";
import PlayerVsBot from "../gameBoards/playerVsBot";
import PlayerVsPlayer from "../gameBoards/playerVsPlayer";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./home.scss";

function Home() {
  const [chessboardSize, setChessboardSize] = useState(undefined);
  const [selectedBoard, setSelectedBoard] = useState("DefaultBoard");
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);

  const handleMove = (move, color) => {
    if (color === "b") {
      setWhiteMoves([...whiteMoves, move]);
    }
    if (color === "w") {
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

  function getSelectedBoard() {
    switch (selectedBoard) {
      case "DefaultBoard":
        return (
          <>
            <DefaultBoard boardWidth={chessboardSize} />
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
            />
            <br />
          </>
        );
      case "PlayerVsPlayer":
        return (
          <>
            <PlayerVsPlayer boardWidth={chessboardSize} />
            <br />
          </>
        );
    }
  }

  return (
    <>
      <div className="play">
        <Navbar />
        <div className="container">
          <div className="row justify-content-around">
            <div className="chess col-12 col-lg-9 mt-3">
              {getSelectedBoard()}
            </div>
            <div className="col-12 col-lg-3 mt-3 btn-col">
              <div className="row row-cols-2 row-cols-lg-1">
                <div className="col-12">
                  <h3 className="game-mode-header">Select game mode</h3>
                </div>
                <div className="col-12">
                  <button
                    className="game-btn select-btn"
                    onClick={() => {
                      setSelectedBoard("DefaultBoard");
                    }}
                  >
                    Practice Board
                  </button>
                </div>
                <div className="col-12">
                  <button
                    className="game-btn select-btn"
                    onClick={() => {
                      setSelectedBoard("PlayerVsBot");
                    }}
                  >
                    Player vs Bot
                  </button>
                </div>
                <div className="col-12">
                  <button
                    className="game-btn select-btn"
                    onClick={() => {
                      setSelectedBoard("PlayerVsPlayer");
                    }}
                  >
                    Player vs Player
                  </button>
                </div>
              </div>
              <div className="col-12">
                <h3>Move History</h3>
              </div>
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <h4>White</h4>
                    <ul>
                      {whiteMoves && whiteMoves.length ? (
                        whiteMoves.map((move, index) => {
                          if (move) return <li key={index}>{move.san}</li>;
                          else return <li key={index}>null</li>;
                        })
                      ) : (
                        <li>no moves</li>
                      )}
                    </ul>
                  </div>
                  <div className="col-6">
                    <h4>Black</h4>
                    <ul>
                      {blackMoves && blackMoves.length ? (
                        blackMoves.map((move, index) => {
                          if (move) return <li key={index}>{move.san}</li>;
                          else return <li key={index}>null</li>;
                        })
                      ) : (
                        <li>no moves</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Home />,
    document.body.appendChild(document.createElement("div"))
  );
});
