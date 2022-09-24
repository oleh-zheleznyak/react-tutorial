import React from "react";
import {Board} from "./Board";
import {Winner} from "./Winner";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                xIsNext: true,
                winner: null,
            }],
            showStepNumber: 0,
            sortOrderAsc: true,
        };
    }

    nextPlayer = () => this.historyAtStep().xIsNext ? 'X' : 'O';

    currentPlayer = (index) => this.historyAtStep(index).xIsNext ? 'O' : 'X';

    historyAtStep = (index) => this.state.history[index ?? this.state.showStepNumber];

    handleClick = (i) => {
        const state = this.historyAtStep();
        if (state.winner) return;
        if (state.squares[i]) return;

        const newState = state.squares.slice();
        newState[i] = this.nextPlayer();
        const winner = Winner.calculateWinner(newState);
        this.setState({
            showStepNumber: this.state.showStepNumber + 1,
            history: this.state.history.slice(0, this.state.showStepNumber + 1).concat({
                squares: newState,
                xIsNext: !state.xIsNext,
                winner: winner,
                indexModified: i
            })
        });
    }

    lastStep = 9;
    statusText = () => this.historyAtStep().winner
        ? `Winner ${this.historyAtStep().winner.mark}`
        : this.state.showStepNumber === this.lastStep
            ? "Draw!"
            : `Next player: ${this.nextPlayer()}`;

    indexToRowCol = (index) => `(${Math.floor(index / 3)};${index % 3})`;

    sort = (e) => {
        const value = e.target.value === "asc";
        this.setState({
            sortOrderAsc: value
        });
    };

    render() {
        let history =  this.state.history;
        const moves = history.map((record, index) => {
            const name = index ? `Go to move ${index}` : 'Go to start';
            const indexModified = this.historyAtStep(index).indexModified;
            const description = index ?
                `Player ${this.currentPlayer(index)} modified square with index ${indexModified} and coordinates (row,col) ${this.indexToRowCol(indexModified)}` : '';
            return (
                <li key={index.toString() + this.state.sortOrderAsc.toString()}>
                    <button onClick={() => this.jumpTo(index)}>{name}</button> <div className={index === this.state.showStepNumber ? "current-history" : "" }>{description}</div>
                </li>
            );
        });
        if (!this.state.sortOrderAsc) {
            moves.reverse();
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick={this.handleClick} squares={this.historyAtStep().squares} winner={this.historyAtStep().winner}/>
                </div>
                <div className="game-info">
                    <div>{this.statusText()}</div>
                    <div onChange={this.sort}>
                        <input type="radio" value="asc" name="sort" defaultChecked={true} />
                        <label htmlFor="asc">Sort Ascending</label>
                        <input type="radio" value="desc" name="sort" />
                        <label htmlFor="desc">Sort Descending</label>
                    </div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }

    jumpTo(index) {
        this.setState({
            showStepNumber: index
        })
    }
}
