import React from "react";

import './lessons.scss';

export default function ThePawn(props) {

    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        props.changeLesson(lesson);
    }
    
    return (
        <div className="container">
            <div className="row lesson-row">
                <div className="col-12">
                    <h1 className="lesson-title">The Pawn</h1>
                </div>
                <div className="col-12">
                    <p className="content">
                    It's finally time to understand how to move and attack with our pieces and what better place to start than with the pawn! The pawn is the only piece that cannot move backwards. It will march forward the whole game one square at a time. Pawns will often be the first piece that is moved in a game because they are in front of all the other pieces. With that being said, on the very first move of each pawn, you will have a choice to make. You may move the pawn 2 squares forward if the square is available for it to be placed there but only on the first move for each pawn. For example, at the very start of the game white may chose to move his e pawn to either e3, which would be one square forward, or e4 which would be two squares forward. Now lets say white decides to put his pawn one square forward to e3. His opponent will then play a move like e pawn to e6. Now white can only move the pawn on e3 to e4 one square forward. They will no longer be able to move the e pawn 2 squares to e5 because they already moved that pawn. The same is true for blacks e pawn on e6. Now lets talk about how the pawn attacks. The pawn can not take a piece that is in front of them on the same file. They can only take a piece diagonally forward to the right or left of them. Remember, the pawn can only move forward on the same file unless it captures a piece diagonally. After a pawn captures a piece diagonally, it will now be able to move forward on that new file. If a pawn manages to make its way all the way to the opponents back rank, it can be promoted to another more powerful piece like a rook, knight, bishop, and in most cases, a queen! The new piece will replace the pawn on the square it made it too and will now be able to follow the movement rules of that piece for the remainder of the game. There is another special move the pawn can do known as En passant but we will cover that in a later section of special moves to reduce confusion.
                    </p>
                    <div className="lesson-btn-row">
                        <button id="0" 
                            className="lesson-btn" onClick={handleClick}>
                            Terms
                        </button>
                        <button id="3"
                            className="lesson-btn prev-btn" onClick={handleClick}>
                            Prev
                        </button>
                        <button id="5"
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