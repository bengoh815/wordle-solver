import React from 'react';
import Board from './board';
import Square from './Square';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(30).fill("b"),
        };
    }

    handleClick() {
        const squares = this.state.squares;
        squares[0] = "asdf";
        this.setState({
            squares: squares,
        });
    }

    handleKeyDown = (e) => {
        console.log(e);
    }

    render() {
        return (
            <div className="game">
                <div className="board">
                    <Board
                        squares={this.state.squares}
                    />
                </div>
                <button
                 onKeyDown={this.handleKeyDown}>change</button>
            </div>
            );
    }
}
