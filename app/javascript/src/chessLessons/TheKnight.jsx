import React from "react";
import LearnBoard from "../gameBoards/learnBoard";

import "../learn/learn.scss";

export default function TheKnight(props) {
  const { colorTheme, boardWidth, fen, setFen } = props;
  const moves = [
    "",
    "Nc3",
    "Nh6",
    "Ne4",
    "c5",
    "Nxc5",
    "Nc6",
    "Nd3",
    "Nf5",
    "Nf3",
    "Ncd4",
    "Nxd4",
    "Nxd4",
    "",
  ];

  return (
    <div className="container">
      <div className="row lesson-row mt-2">
        <div className="title col-12  col-md-6">
          <h1 className="lesson-title">
            The <span>Knight</span>
          </h1>
        </div>
        <div className="board col-12  col-md-6">
          <div>
            <LearnBoard
              fen={fen}
              setFen={setFen}
              colorTheme={colorTheme}
              boardWidth={boardWidth}
              showMessage={false}
              moves={moves}
            />
          </div>
        </div>
        <div className="col-12">
          <p className="content">
            Okay, now that we've given some love to the humble pawn, let's be
            real: only being able to move one square at a time, and only forward
            at that, is kind of lame. That's where the knights come in - they're
            easily one of the coolest pieces on the board, and we at the Knights
            Den are proud to be named after them. What sets the knight apart
            from the other pieces is its unique move. While most pieces move in
            straight lines, the knight moves in an L-shaped pattern, hopping
            over other pieces to reach its destination. This makes it incredibly
            useful for jumping over enemy lines and taking out well-guarded
            pieces. Lets talk a little more about that L-shaped pattern. The
            knight can move two squares in one direction (either horizontally or
            vertically) and then one square perpendicular to that, resulting in
            an L-shape. Another way to think about the way a knight can move
            would be by starting with either of the 4 squares diagonal to the
            knight, and then moving one square horizontally or vertically from
            that square away from the knight which, again, will resemble an
            L-shape. This pattern can be a bit tricky to visualize, but it's
            really quite simple once you get the hang of it. In fact, this would
            be a good time to mention if you haven't visited the terms page,
            there is an interactive board that allows you to cl;ick on a piece
            to show all of that pieces legal moves and allow you to make moves
            to help better understand the knight or any of the other (not as
            cool) pieces that you want!
          </p>
        </div>
      </div>
    </div>
  );
}
