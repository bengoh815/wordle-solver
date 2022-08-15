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
        console.log("CLICK");
        // this.setState({
        //     squares: Array(30).fill("asdf"),
        // });
    }

    render() {
        return (
            <div className="game">
                <div className="board">
                    <Board
                        squares={this.state.squares}
                    />
                </div>
                <button onClick={this.handleClick()}>change</button>
            </div>
            );
    }
}
