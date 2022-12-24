import React from "react";

import './lessons.scss';

export default function TheQueen(props) {

    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        props.changeLesson(lesson);
    }
    
    return (
        <div className="container">
            <div className="row lesson-row">
                <div className="col-12">
                    <h1 className="lesson-title">The Queen</h1>
                </div>
                <div className="col-12">
                    <p className="content">
                    The queen is the most powerful piece in the game because it has the most amount of ways to move. It can move how the rook moves as well as the bishop! It can move any number of squares horizontally, vertically, or diagonally. It can move in any one of the 8 directions once per move. The queen can't move through its own pieces and will capture an opposing players piece by moving itself to the position of that piece. This makes the queen a very powerful attacking piece.
                    </p>
                    <div className="lesson-btn-row">
                        <button id="7"
                            className="lesson-btn prev-btn" onClick={handleClick}>
                            Prev
                        </button>
                        <button id="9"
                            className=" lesson-btn next-btn" 
                            onClick={handleClick}>
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

