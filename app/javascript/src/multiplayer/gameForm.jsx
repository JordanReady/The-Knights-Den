import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { handleErrors, safeCredentials } from "../utils/fetchHelper";
import "bootstrap/dist/css/bootstrap.min.css";
import "./multiplayer.scss";

const GameForm = (props) => {
  const [game_id, setGameId] = useState(undefined);
  const [gameLink, setGameLink] = useState(undefined);
  const [white_player_id, setWhitePlayerId] = useState("");
  const [black_player_id, setBlackPlayerId] = useState("");
  const [joinGameId, setJoinGameId] = useState("");

  const handleWhitePlayer = (e) => {
    setWhitePlayerId(e.target.value);
  };

  const handleBlackPlayer = (e) => {
    setBlackPlayerId(e.target.value);
  };

  const createGameLink = (e) => {
    e.preventDefault();
    //if white_player_id or black_player_id is empty, alert user to enter id
    if (white_player_id == "" || black_player_id == "") {
      alert("Please enter a valid id for white and black player!");
    }
    //if white_player_id and black_player_id are the same, alert user to enter different id
    else if (white_player_id == black_player_id) {
      alert("Please enter different ids for white and black player!");
    }
    //if white_player_id or black_player_id is not the same as user_id, alert user to enter correct id
    else if (
      white_player_id != props.user_id &&
      black_player_id != props.user_id
    ) {
      alert("Please enter your id as either white or black player!");
    } else {
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
            player_1_id: white_player_id,
            player_2_id: black_player_id,
            player_1_draw_offer: false,
            player_2_draw_offer: false,
          },
        }),
      })
        .then(handleErrors)
        .then((data) => {
          console.log(data.game.id);
          setGameId(data.game.id);
          //make the game link whatever the current url is + / data.game.id
          setGameLink(window.location.href + "/" + data.game.id);
        });
    }
  };

  const joinGame = (e) => {
    e.preventDefault();
    if (!joinGameId || isNaN(joinGameId)) {
      alert("Please enter a valid game ID.");
    } else {
      const gameLink = window.location.href + "/" + joinGameId;
      setGameLink(gameLink);
      window.location.href = gameLink;
    }
  };

  return (
    <div className="container game-container">
      <div className="row">
        <div className="col-12 header">
          <h1>Create a Multiplayer Game!</h1>
          <h2>Your Id:{props.user_id}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-12 form-box">
          <form className="game-form">
            <div className="form-group">
              <label>White Player Id</label>
              <input
                type="text"
                className="form-control"
                placeholder="Id"
                value={white_player_id}
                onChange={handleWhitePlayer}
              />
              <label>Black Player Id</label>
              <input
                type="text"
                className="form-control"
                placeholder="Id"
                value={black_player_id}
                onChange={handleBlackPlayer}
              />
            </div>
            <button
              type="submit"
              className="btn create-btn"
              onClick={createGameLink}
            >
              Create Game Link
            </button>
            {gameLink && (
              <p className="game-info">
                <span>Here is your game link!</span>
                {gameLink} <br />
                <span>Share this link with your opponent!</span>
                <br />
                <span>Or give them this game id to enter!</span>
                <span>Game ID: {game_id}</span>
                <span>
                  Click <a href={gameLink}>Here</a> to start your game!
                </span>
              </p>
            )}
          </form>
          <div className="col-12 header">
            <h1>Join Multiplayer Game!</h1>
          </div>
          <form className="game-form">
            <div className="form-group">
              <label>Game ID</label>
              <input
                type="int"
                className="form-control"
                placeholder="Game ID"
                value={joinGameId}
                onChange={(e) => setJoinGameId(e.target.value)}
              />
            </div>
            <button type="submit" className="btn create-btn" onClick={joinGame}>
              Join Game
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GameForm;
