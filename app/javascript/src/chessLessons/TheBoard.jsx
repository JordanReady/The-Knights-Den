import React from "react";

import './lessons.scss';

export default function TheBoard(props) {

    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        props.changeLesson(lesson);
    }
    
    return (
        <div className="container">
            <div className="row lesson-row">
                <div className="col-12">
                    <h1 className="lesson-title">The Board</h1>
                </div>
                <div className="col-12">
                    <p className="content">
                    Welcome to the learning section of the app. This was created for beginners who want to learn how to play chess. If there is ever a point during a lesson where a term is used that you are unfamiliar with, you can click the terms button on the lower right corner of your screen for reference. The chess board is an 8 by 8 grid of squares alternating colors from light to dark on every other square. The board is split up horizantally by what are known as ranks, and horizantally by what are known as files. These ranks and files are labeled by letters and numbers. Each horizontal rank has a file number 1 - 8 across the board, and each file has a file letter a - h across the board. The entire game of chess is restricted to piece movements inside these files and ranks!
                    </p>
                    <div className="lesson-btn-row">
                        <button id="0" 
                            className="lesson-btn" onClick={handleClick}>
                            Terms
                        </button>
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

