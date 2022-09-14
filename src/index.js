import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    return (
        <button
            className={props.highlight ? "square square-path" : "square"}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square key={i}
                value={this.props.squares[i]}
                    highlight={this.props.winner?.points?.includes(i)}
                onClick={() => this.props.onClick(i)}
            />
        );
    }


    render() {

        const boardRows = [];
        for (let row = 0; row < 3; row++) {
            let columns = [];
            for (let col = 0; col < 3; col++) {
                let square = this.renderSquare(row * 3 + col);
                columns.push(square);
            }
            let div = <div className="board-row">{columns}</div>
            boardRows.push(div);
        }

        return (<div>{boardRows}</div>);
    }

}

class Game extends React.Component {
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
        const winner = calculateWinner(newState);
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
        : this.state.showStepNumber == this.lastStep
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
                            <label for="asc">Sort Ascending</label>
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

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game/>);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return new Winner(squares[a], lines[i]);
        }
    }
    return null;
}

class Winner {
    constructor(mark, points) {
        this.mark = mark;
        this.points = points;
    }
}