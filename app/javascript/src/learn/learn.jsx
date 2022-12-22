import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar";
import { useState, useEffect } from "react";
import TheBoard from "../chessLessons/TheBoard";


import './learn.scss';
import PlacingPieces from "../chessLessons/PlacingPieces";
import LearnNavbar from "./learnNavbar";

function Learn() {
    const [lesson, setLesson] = useState("1");

    function getLesson() {
        switch (lesson) {
            case "1":
                return (
                    <TheBoard
                    changeLesson={changeLesson}
                    />
                );
            case "2":
                return (
                    <PlacingPieces
                    changeLesson={changeLesson} />
                );
        }
    }

    function changeLesson(les) {
        setLesson(les);
    }

    return (
        <>
        <Navbar />
        <div className="learn">
            <LearnNavbar
            changeLesson={changeLesson}
            />
            <div className="container">
                <div className="lesson">
                    {getLesson()}
                </div>
            </div>
        </div>
        </>
    );
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Learn />,
        document.body.appendChild(document.createElement('div')),
    );
    }
);

