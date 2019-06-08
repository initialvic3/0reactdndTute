import React from "react";
import ReactDOM from "react-dom";
import Board from "./containers/Board";
import { observe } from "./Game";

const root = document.getElementById("root");

observe((knightPosition: [number, number]) =>
  ReactDOM.render(<Board knightPosition={knightPosition} />, root)
);
