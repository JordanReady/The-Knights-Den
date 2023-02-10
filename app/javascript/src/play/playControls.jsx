import React from "react";
import ThemePicker from "../themePicker/themePicker";

import "./home.scss";

const PlayControls = (props) => {
  const handleMultiplayer = () => {
    // send to multiplayer page
    let url = window.location.href + "multiplayer";
    window.location.href = url;
  };

  return (
    <div className="btn-col col-12 col-lg-3">
      <div className="col-12 btn-col-el">
        <ThemePicker
          colorTheme={props.colorTheme}
          handleColorChange={props.handleColorChange}
        />
      </div>
      <div className="row row-cols-2 row-cols-lg-1">
        <div className="col-12">
          <h3 className="game-mode-header btn-col-el">Select game mode</h3>
        </div>
        <div className="col-4 col-lg-12">
          {props.selectedBoard === "DefaultBoard" ? (
            <button
              className="game-btn select-btn active-btn btn-col-el"
              onClick={() => {
                props.setSelectedBoard("DefaultBoard");
                props.setBlackMoves([]);
                props.setWhiteMoves([]);
              }}
            >
              Practice Board
            </button>
          ) : (
            <button
              className="game-btn select-btn btn-col-el"
              onClick={() => {
                props.setSelectedBoard("DefaultBoard");
                props.setBlackMoves([]);
                props.setWhiteMoves([]);
              }}
            >
              Practice Board
            </button>
          )}
        </div>
        <div className="col-4 col-lg-12">
          {props.selectedBoard === "PlayerVsBot" ? (
            <button
              className="game-btn select-btn active-btn btn-col-el"
              onClick={() => {
                props.setSelectedBoard("PlayerVsBot");
                props.setBlackMoves([]);
                props.setWhiteMoves([]);
              }}
            >
              Player vs Bot
            </button>
          ) : (
            <button
              className="game-btn select-btn btn-col-el"
              onClick={() => {
                props.setSelectedBoard("PlayerVsBot");
                props.setBlackMoves([]);
                props.setWhiteMoves([]);
              }}
            >
              Player vs Bot
            </button>
          )}
        </div>
        <div className="col-4 col-lg-12">
          {props.selectedBoard === "PlayerVsPlayer" ? (
            <button
              className="game-btn select-btn active-btn btn-col-el"
              onClick={() => {
                props.handleMultiplayer();
              }}
            >
              Player vs Player
            </button>
          ) : (
            <button
              className="game-btn select-btn btn-col-el"
              onClick={() => {
                handleMultiplayer();
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
              {props.whiteMoves && props.whiteMoves.length ? (
                props.whiteMoves.map((move, index) => {
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
              {props.blackMoves && props.blackMoves.length ? (
                props.blackMoves.map((move, index) => {
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
  );
};

export default PlayControls;
