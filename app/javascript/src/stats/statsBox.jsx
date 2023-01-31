import React from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./stats.scss";
import { safeCredentials, handleErrors } from "../utils/fetchHelper";

class StatsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "PlayerName",
      user_id: "",
      games: null,
      wins: null,
      losses: null,
      draws: null,
    };
    this.getStats = this.getStats.bind(this);
    this.updateWins = this.updateWins.bind(this);
    this.updateLoss = this.updateLoss.bind(this);
    this.updateDraw = this.updateDraw.bind(this);
  }

  componentDidMount() {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          username: data.username,
          user_id: data.user_id,
        });
        return this.getStats();
      });
  }

  getStats = () => {
    console.log("updateStats");
    fetch(`/api/users/${this.state.user_id}/stats`)
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        console.log(data.stats.total_games);
        this.setState({
          games: data.stats.total_games,
          wins: data.stats.wins,
          losses: data.stats.losses,
          draws: data.stats.draws,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateWins = () => {
    console.log("updateWins");
    fetch(`/api/users/${this.state.user_id}/stats/win`)
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          wins: data.stats.wins,
          games: data.stats.total_games,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateLoss = () => {
    console.log("updateLoss");
    fetch(`/api/users/${this.state.user_id}/stats/loss`)
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          losses: data.stats.losses,
          games: data.stats.total_games,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  updateDraw = () => {
    console.log("updateDraw");
    fetch(`/api/users/${this.state.user_id}/stats/draw`)
      .then(handleErrors)
      .then((data) => {
        console.log(data);
        this.setState({
          draws: data.stats.draws,
          games: data.stats.total_games,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="viewport">
        <div className="container my-5 stats-box shadow p-4">
          <div className="row">
            <div className="col-12">
              <h2 className="mb-4 username shadow">{this.state.username}</h2>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 stat-tile mb-2 shadow">
              <h3 className="stat-header mb-2">Games</h3>
              <h3 className="stat-num">{this.state.games}</h3>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 stat-tile mb-2 shadow">
              <h3 className="stat-header mb-2">Wins</h3>
              <h3 className="stat-num">{this.state.wins}</h3>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 stat-tile mb-2 shadow">
              <h3 className="stat-header mb-2">Losses</h3>
              <h3 className="stat-num">{this.state.losses}</h3>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-3 stat-tile mb-2 shadow">
              <h3 className="stat-header mb-2">Draws</h3>
              <h3 className="stat-num">{this.state.draws}</h3>
            </div>
          </div>
        </div>
        <button className="btn btn-primary" onClick={this.getStats}>
          Get stats
        </button>
        <button className="btn btn-success" onClick={this.updateWins}>
          Update Win
        </button>
        <button className="btn btn-danger" onClick={this.updateLoss}>
          Update Loss
        </button>
        <button className="btn btn-warning" onClick={this.updateDraw}>
          Update Draw
        </button>
      </div>
    );
  }
}

export default StatsBox;
