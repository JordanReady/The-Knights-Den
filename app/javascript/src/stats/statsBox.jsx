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
      moves: [],
    };
    this.getStats = this.getStats.bind(this);
    this.getGameMoves = this.getGameMoves.bind(this);
    this.showMoves = this.showMoves.bind(this);
  }

  componentDidMount() {
    fetch("/api/sessions/authenticated")
      .then(handleErrors)
      .then((data) => {
        this.setState({
          username: data.username,
          user_id: data.user_id,
        });
        return this.getStats();
      });
  }

  getStats = () => {
    fetch(`/api/users/${this.state.user_id}/stats`)
      .then(handleErrors)
      .then((data) => {
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

  getGameMoves = () => {
    let id = 21;
    fetch(`/api/games/${id}/moves`)
      .then(handleErrors)
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          console.log(data[i].move);
          this.setState({
            moves: [...this.state.moves, data[i].move],
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  showMoves = () => {
    console.log(this.state.moves);
  };

  reset = () => {
    fetch(`/api/users/${this.state.user_id}/stats/reset`)
      .then(handleErrors)
      .then((data) => {
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
      </div>
    );
  }
}

export default StatsBox;
