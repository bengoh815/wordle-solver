import React from 'react';
import Square from './Square'

export default function Board() {
    return (
        <div>
            <div className="board-row">
                <Square value="w"/>
            </div>
        </div>
    );
}