import React from 'react';
import Board from './board';
import Square from './Square';

export default function Game(props) {
    return (
    <div className="game">
        <div className="board">
            <Board />
        </div>
    </div>
    );
}
