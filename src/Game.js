import React from 'react';
import Board from './board';
import Text from './text';
import styles from '../styles/Game.module.css'
import { data } from './data';

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guess: '',
            guesses: Array(6).fill(""),
            color: '',
            colors: Array(6).fill(""),
            guessNum: 1,
            words: data,
        };

        this.handleChangeGuess = this.handleChangeGuess.bind(this);
        this.handleChangeColor = this.handleChangeColor.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.solver = this.solver.bind(this);
        this.multipleLetters = this.multipleLetters.bind(this);
        this.removeGreen = this.removeGreen.bind(this);
        this.removeYellow = this.removeYellow.bind(this);
        this.removeGray = this.removeGray.bind(this);
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
        const wordsUpdate = this.solver(this.state.guess, this.state.color, this.state.words.slice());
        this.setState({
            guesses: guessArr,
            colors: colorArr,
            guessNum: num + 1,
            guess: '',
            color: '',
            words: wordsUpdate,
        });
        event.preventDefault();
    }

    solver(word, color, data) {
        let jsonData = {
            "pos": {},
            "1": {
                "dict": {},
            },
            "2+": {
                "dict": {},
            }
        };
        
        // parse input
        for(let i = 0; i < word.length; i++) {
            const char = word.charAt(i);
            const index = Object.keys(jsonData["1"]["dict"]).indexOf(char);
            if(index < 0
            && Object.keys(jsonData["2+"]["dict"]).indexOf(char) < 0) {
                // does not exist in both dicts
                jsonData["1"]["dict"][char] = color.charAt(i);
            } else if(index >= 0) {
                // exist in dict 1
                // remove from 1 
                const colorVar = jsonData["1"]["dict"][char];
                delete jsonData["1"]["dict"][char];
                // put to 2
                jsonData["2+"]["dict"][char] = [];
                jsonData["2+"]["dict"][char].push(colorVar);
                jsonData["2+"]["dict"][char].push(color.charAt(i));
            } else {
                // extend color in dict 2
                jsonData["2+"]["dict"][char].push(color.charAt(i));
            }
            
            
            if(Object.keys(jsonData["pos"]).indexOf(char) < 0) {
                jsonData["pos"][char] = [];
            }
            jsonData["pos"][char].push(i);
        }
        
        // processing data
        // singles
        const letterKeys = Object.keys(jsonData["1"]["dict"]);
        for(let i = 0; i < letterKeys.length; i++) {
            const colorValue = jsonData["1"]["dict"][letterKeys[i]];
            switch(colorValue) {
                case "G":
                    this.removeGreen(letterKeys[i], jsonData["pos"][letterKeys[i]][0], data);
                    break;
                case "y":
                    this.removeYellow(letterKeys[i], jsonData["pos"][letterKeys[i]][0], data);
                    break;
                case "g":
                    this.removeGray(letterKeys[i], data);
                    break;
            }
        }
        
        
        // two plus
        const dupKeys = Object.keys(jsonData["2+"]["dict"]);
        for(let i = 0; i < dupKeys.length; i++) {
            for(let j = 0; j < data.length; j++) {
                if(this.multipleLetters(data[j], dupKeys[i], jsonData["pos"][dupKeys[i]]
                , jsonData["2+"]["dict"][dupKeys[i]]) === false) {
                    data.splice(j, 1);
                    j--
                }
            }
        }
        
        return data;
    }
    
    // should be working as intended
    multipleLetters(dataWord, letter, posArr, colorArr) {
        // store and do gray last
        // must possArr.length === colorArr.length
        var valid = true;
        var gray = [];
        for(let i = 0; i < colorArr.length; i++) {
            switch(colorArr[i]) {
                case "G":
                    // green. letter not at that spot = false
                    if(dataWord.charAt(posArr[i]) !== letter) {
                        return false;
                    }
                    break;
                case "y":
                    // yellow. letter at that spot = false
                    if(dataWord.charAt(posArr[i]) === letter) {
                        return false;
                    }
                    break;
                case "g":
                    // gray. letter at that spot and all other non same letter spot = false
                    // hence, save it for last to do special stuff
                    gray.push(posArr[i]);
            }
        }
        // gray MIGHT NEED REWORK. SMTG FEELS OFF
        // like maybe count those that has non gray color?
        if(gray.length > 0) {
            var count = 0;
            for(let i = 0; i < dataWord.length; i++) {
                if(dataWord.charAt(i) === letter) count += 1;
            }
            if(count !== (colorArr.length - gray.length)) return false;
        }
        return true;
    }
    
    // this function checks out
    removeGreen(letter, position, data) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].indexOf(letter) !== position) {
                data.splice(i, 1);
                i--;
            }
        }
    }
    
    // this function checks out
    removeYellow(letter, position, data) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].indexOf(letter) === position) {
                data.splice(i, 1);
                i--;
            }
        }
    }
    
    // this function checks out
    removeGray(letter, data) {
        for(let i = 0; i < data.length; i++) {
            if(data[i].includes(letter)) {
                data.splice(i, 1);
                i--;
            }
        }
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
                    text={this.state.words}
                />
            </div>
            );
    }
}
