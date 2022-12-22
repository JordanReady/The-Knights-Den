import React from "react";

import './lessons.scss';

export default function TheBoard(props) {

    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        props.changeLesson(lesson);
    }
    
    return (
        <div className="containter">
            <div className="row">
                <div className="col-12">
                    <h1>The Board</h1>
                </div>
                <div>
                    <h5>
                    The chess board is an 8 by 8 grid of squares alternating colors from light to dark every other square. The board is split up horizantally by what are known as ranks, and horizantally by what are known as files. These ranks and files are are labled by letters and numbers. Each horizantal rank has a file number 1 - 8 up the board and each file has a file letter a - h accross the board. The entire game of chess is restricted to piece movments inside these files and ranks!
                    </h5>
                    <div className="lesson-btn-row">
                        <button id="1"
                            className="lesson-btn prev-btn disabled" onClick={handleClick}>
                            Prev
                        </button>
                        <button id="2"
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

