import React from "react";

export function Square(props) {
    return (
        <button
            className={props.highlight ? "square square-path" : "square"}
            onClick={props.onClick}>
            {props.value}
        </button>
    );
}