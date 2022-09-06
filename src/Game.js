import React from 'react';
import Board from './board';
import Text from './text';
import styles from '../styles/Game.module.css'
import { words } from './words';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: '',
            guesses: Array(6).fill("asdf"),
            color: '',
            colors: Array(6).fill("red"),
            guessNum: 1,
        };

        this.handleChangeGuess = this.handleChangeGuess.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeGuess(event) {
        // handle validation?
        this.setState({guess: event.target.value});
    }

    handleChangeColor(event) {
        this.setState({color: event.target.value});
    }

    handleSubmit(event) {
        const num = this.state.guessNum;
        const guessArr = this.state.guesses.slice();
        const colorArr = this.state.colors.slice();
        guessArr[num - 1] = this.state.guess;
        colorArr[num - 1] = this.state.color;
        this.setState({
            guesses: guessArr,
            colors: colorArr,
            guessNum: num + 1,
            guess: '',
            color: '',
        });
        event.preventDefault();
    }

    render() {
        return (
            <div className={styles.game}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <label>Guess Number {this.state.guessNum}: </label>
                    <input type="text" value={this.state.guess} onChange={this.handleChangeGuess}></input>
                    <input type="text" value={this.state.color} onChange={this.handleChangeColor}></input>
                    <button type="submit">Submit</button>
                </form>
                <Board
                    guesses={this.state.guesses}
                    colors={this.state.colors}
                />
                <Text
                    text={words}
                    // text={"banana"}
                />
            </div>
            );
    }
}
