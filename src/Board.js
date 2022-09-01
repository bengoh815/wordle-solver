import React from 'react';
import Square from './Square'
import styles from "../styles/Board.module.css"

export default class Board extends React.Component {
    renderRow(i) {
        return (
            <div className={styles.row}>
                <Square 
                    value={this.props.guesses[i]}
                />
                <Square 
                    value={this.props.colors[i]}
                />
            </div>
        );
    }

    render() {
        return (
            <div className={styles.board}>
                {this.renderRow(0)}
                {this.renderRow(1)}
                {this.renderRow(2)}
                {this.renderRow(3)}
                {this.renderRow(4)}
                {this.renderRow(5)}
            </div>
        );
    }

}