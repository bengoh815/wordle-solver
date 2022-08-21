import React from 'react';
import Board from './board';
import Square from './Square';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: '',
            guesses: Array(6).fill("asdf"),
            guessNum: 1,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({guess: event.target.value});
    }

    handleSubmit(event) {
        const num = this.state.guessNum;
        const arr = this.state.guesses.slice();
        arr[num - 1] = this.state.guess;
        this.setState({
            guesses: arr,
            guessNum: num + 1,
            guess: '',
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className="game">
                <form onSubmit={this.handleSubmit}>
                    <label>Guess Number {this.state.guessNum}: </label>
                    <input type="text" value={this.state.guess} onChange={this.handleChange}></input>
                    <button type="submit">Submit</button>
                </form>
                <div className="board">
                    <Board
                        guesses={this.state.guesses}
                    />
                </div>
            </div>
            );
    }
}
