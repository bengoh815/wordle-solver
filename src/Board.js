import React from 'react';
import Square from './Square'

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square 
                value={this.props.guesses[i]}
            />
        );
    }

    render() {
        return (
            <div>
                {this.renderSquare(0)}
                {this.renderSquare(1)}
                {this.renderSquare(2)}
                {this.renderSquare(3)}
                {this.renderSquare(4)}
                {this.renderSquare(5)}
            </div>
        );
    }

}