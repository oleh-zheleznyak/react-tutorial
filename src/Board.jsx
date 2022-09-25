import React from "react";
import {Square} from "./Square";

export function Board(props) {

    const renderSquare = (i) => {
        return (
            <Square key={i}
                    value={props.squares[i]}
                    highlight={props.winner?.points?.includes(i)}
                    onClick={() => props.onClick(i)}
            />
        );
    };

    const buildBoardRows = () => {
        const boardRows = [];
        for (let row = 0; row < props.fieldSize; row++) {
            let columns = [];
            for (let col = 0; col < props.fieldSize; col++) {
                let square = renderSquare(row * props.fieldSize + col);
                columns.push(square);
            }
            let div = <div className="board-row">{columns}</div>
            boardRows.push(div);
        }
        return boardRows;
    };

    const boardRows = buildBoardRows();

    return (<div>{boardRows}</div>);
};