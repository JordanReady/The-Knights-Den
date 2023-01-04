import React from "react";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";

import "./stats.scss";

class StatsBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "Username",
      games: 27,
      wins: 19,
      losses: 5,
      draws: 3,
    };
  }

  render() {
    return (
      <div className="stats-box shadow p-4">
        <div className="row">
          <div className="col-12">
            <h2 className="mb-4 username shadow">{this.state.username}</h2>
          </div>
          <div className="col-12 col-md-3 stat-tile mb-2 shadow">
            <h3 className="stat-header mb-2">Games</h3>
            <h3 className="stat-num">{this.state.games}</h3>
          </div>
          <div className="col-12 col-md-3 stat-tile mb-2 shadow">
            <h3 className="stat-header mb-2">Wins</h3>
            <h3 className="stat-num">{this.state.wins}</h3>
          </div>
          <div className="col-12 col-md-3 stat-tile mb-2 shadow">
            <h3 className="stat-header mb-2">Losses</h3>
            <h3 className="stat-num">{this.state.losses}</h3>
          </div>
          <div className="col-12 col-md-3 stat-tile mb-2 shadow">
            <h3 className="stat-header mb-2">Draws</h3>
            <h3 className="stat-num">{this.state.draws}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default StatsBox;
