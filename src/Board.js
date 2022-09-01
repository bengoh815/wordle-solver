import React from 'react';
import Square from './Square'

export default class Board extends React.Component {
    renderRow(i) {
        // add flexbox?
        return (
            <div>
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
            <div>
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