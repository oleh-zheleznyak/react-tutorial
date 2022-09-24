import React from "react";
import {Square} from "./Square";

export class Board extends React.Component {
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
