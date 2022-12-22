import React from "react";

import './learn.scss';

const LearnNavbar = (props) => {

    //q: this component is a child of learn.jsx, so how do i pass the button that is clicked to the parent component?
    //a: i need to pass a function to this component that will change the lesson in the parent component
    //q: how that i have the function, how do i call it?
    //a: i need to pass the function to the button, and then call it when the button is clicked
    //q: how do i pass the function to the button?
    //a: i need to pass the function as a prop to this component, and then call it in the button
    //q: how do i pass the function as a prop to this component?
    
    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        console.log(lesson);
        props.changeLesson(lesson);
    }

    return (
        <React.Fragment>
        <ul className="nav">
            <li className="nav-item nav-header">Lessons</li>
            <li className="nav-item">
                <button id="1" className="game-btn" onClick={handleClick}>1</button>
            </li>
            <li className="nav-item">
                <button id="2" className="game-btn" onClick={handleClick}>2</button>
            </li>
            <li className="nav-item">
                <button id="3" className="game-btn" onClick={handleClick}>3</button>
            </li>
            <li className="nav-item">
                <button id="4" className="game-btn" onClick={handleClick}>4</button>
            </li>
            <li className="nav-item">
                <button id="5" className="game-btn" onClick={handleClick}>5</button>
            </li>
            <li className="nav-item">
                <button id="6" className="game-btn" onClick={handleClick}>6</button>
            </li>
            <li className="nav-item">
                <button id="7" className="game-btn" onClick={handleClick}>7</button>
            </li>
            <li className="nav-item">
                <button id="8" className="game-btn" onClick={handleClick}>8</button>
            </li>
            <li className="nav-item">
                <button id="9" className="game-btn" onClick={handleClick}>9</button>
            </li>
        </ul>
    </React.Fragment>
    );
    
    }
    
    export default LearnNavbar;