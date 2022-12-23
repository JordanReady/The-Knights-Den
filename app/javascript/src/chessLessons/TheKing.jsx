import React from "react";

import './lessons.scss';

export default function TheKing(props) {

    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        props.changeLesson(lesson);
    }
    
    return (
        <div className="container">
            <div className="row lesson-row">
                <div className="col-12">
                    <h1 className="lesson-title">The King</h1>
                </div>
                <div className="col-12">
                    <p className="content">
                    The chess board is an 8 by 8 grid of squares alternating colors from light to dark every other square. The board is split up horizantally by what are known as ranks, and horizantally by what are known as files. These ranks and files are are labled by letters and numbers. Each horizantal rank has a file number 1 - 8 up the board and each file has a file letter a - h accross the board. The entire game of chess is restricted to piece movments inside these files and ranks!
                    </p>
                    <div className="lesson-btn-row">
                        <button id="8"
                            className="lesson-btn prev-btn" onClick={handleClick}>
                            Prev
                        </button>
                        <button id="10"
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

