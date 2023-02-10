import React from "react";
import ThemePicker from "../themePicker/themePicker";

import "../play/home.scss";

const MultiplayerControls = (props) => {
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

export default MultiplayerControls;
