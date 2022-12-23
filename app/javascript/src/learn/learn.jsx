import React from "react";
import ReactDOM from "react-dom";
import Navbar from "../navbar/navbar";
import { useState, useEffect } from "react";
import TheBoard from "../chessLessons/TheBoard";
import PlacingPieces from "../chessLessons/PlacingPieces";
import LearnNavbar from "./learnNavbar";
import BasicRules from "../chessLessons/BasicRules";
import ThePawn from "../chessLessons/ThePawn";
import TheKnight from "../chessLessons/TheKnight";
import TheBishop from "../chessLessons/TheBishop";
import TheRook from "../chessLessons/TheRook";
import TheQueen from "../chessLessons/TheQueen";
import TheKing from "../chessLessons/TheKing";
import OtherRules from "../chessLessons/OtherRules";

import './learn.scss';

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
            case "3":
                return (
                    <BasicRules
                    changeLesson={changeLesson} />
                );
            case "4":
                return (
                    <ThePawn
                    changeLesson={changeLesson} />
                );
            case "5":
                return (
                    <TheKnight
                    changeLesson={changeLesson} />
                );
            case "6":
                return (
                    <TheBishop
                    changeLesson={changeLesson} />
                );
            case "7":
                return (
                    <TheRook
                    changeLesson={changeLesson} />
                );
            case "8":
                return (
                    <TheQueen
                    changeLesson={changeLesson} />
                );
            case "9":
                return (
                    <TheKing
                    changeLesson={changeLesson} />
                );
            case "10":
                return (
                    <OtherRules
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

