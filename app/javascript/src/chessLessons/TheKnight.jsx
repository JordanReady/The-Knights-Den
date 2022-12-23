import React from "react";

import './lessons.scss';

export default function TheKnight(props) {

    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        props.changeLesson(lesson);
    }
    
    return (
        <div className="container">
            <div className="row lesson-row">
                <div className="col-12">
                    <h1 className="lesson-title">The Knight</h1>
                </div>
                <div className="col-12">
                    <p className="content">
                    The knight is a very unique piece in chess because it is the only piece that can move around or over another piece. Knights move in a pattern that resembles the letter "L". It must move 3 squares in total vertically and horizantally. The order can be either two sqaures forward, backward, left or right, then one square horizontally or vertically to complete the "L" shape. Or you could start with one square forward, backward, left or right, then two squares horizontally or vertically to complete the "L" shape. Another way to think about the way a knight can move would be by starting with either of the 4 squares diagonal to the knight, and then moving one square horizontally or vertically from that square so long as the square vertically or horizantally isnt right next to the starting position of the knight. Any of these methods will give you the correct legal moves of the knight so you can go ahead and use whichever method is easier to understand. The knight will capture any opponents piece that it lands on. This is the only other piece besides a pawn that you can move for the first move of the game because it can jump right over your own pawns!
                    </p>
                    <div className="lesson-btn-row">
                        <button id="4"
                            className="lesson-btn prev-btn" onClick={handleClick}>
                            Prev
                        </button>
                        <button id="6"
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

