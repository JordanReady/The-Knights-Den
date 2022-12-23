import React from "react";

import './lessons.scss';

export default function BasicRules(props) {

    function handleClick(e) {
        e.preventDefault();
        let lesson = e.target.id;
        props.changeLesson(lesson);
    }
    
    return (
        <div className="container">
            <div className="row lesson-row">
                <div className="col-12">
                    <h1 className="lesson-title">Basic Chess Rules</h1>
                </div>
                <div className="col-12">
                    <p className="content">
                      We now have the board set up and ready to play a game of chess, so how do we actually play? The goal of chess is to try and capture your opponents king. Each player will take turns, starting with the white player, to move a single piece on their turn. You are not allowed to move a piece to a square that already has one of your own pieces on it and, with the exeption of the knight, you are not allowed to move over a piece either. As previously mentioned, we will go into more detail about how each piece can move, these are just the general rules of play that apply to most situations. When a player moves a piece into a square that is occupied by an opponenets piece, that piece is then captured and removed from the board. You can only capture one piece per move and the piece that you use to capture an opponents piece will be placed on that square ending your turn. Often times, after you capture an opponents piece, that piece will be vulnerable to being captured on your opponents next turn. The game can end after someone can no longer defend their king which is known as "Checkmate". This results in the player who put the opposing player in checkmate, as the winner recieving 1 point and the loser, who was put in checkmate, recieveing 0 points. However, often times a game will end in a "Draw" or "Stalemate". Both of these outcomes will not have a winner and will result in 1/2 a point for each player. A draw can be a mutual agreement between players at any time during the game or in the event where there is not enough pieces for either player to checkmate the king. A stalemate will occur if the king is not directly under attack on their turn to move, but all available squares the king has to move would put the king in checkmate. If these outcomes seem confusing right now, move on to the next sections to get a better understanding of how pieces move and attack eachother and revisit this section later. Chess is a complicated game but with enough practice, all these rules will make sense and you'll be checkmating your opponents before you know it!
                    </p>
                    <div className="lesson-btn-row">
                        <button id="2"
                            className="lesson-btn prev-btn" onClick={handleClick}>
                            Prev
                        </button>
                        <button id="4"
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