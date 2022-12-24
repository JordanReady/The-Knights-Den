import React from "react";

import './lessons.scss';

export default function TheRook(props) {

    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        props.changeLesson(lesson);
    }
    
    return (
        <div className="container">
            <div className="row lesson-row">
                <div className="col-12">
                    <h1 className="lesson-title">The Rook</h1>
                </div>
                <div className="col-12">
                    <p className="content">
                    The rook, much like the bishop, is a long range attacking piece. The rook however, can move any number of squares along its current file or rank either forwards, backwards, left or right. It can only move in one of those 4 directions once per move and cannot move diagonally ever. The rook can't move through its own pieces and will capture an opposing players piece by moving itself to the position of that piece.
                    </p>
                    <div className="lesson-btn-row">
                        <button id="0" 
                            className="lesson-btn" onClick={handleClick}>
                            Terms
                        </button>
                        <button id="6"
                            className="lesson-btn prev-btn" onClick={handleClick}>
                            Prev
                        </button>
                        <button id="8"
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

