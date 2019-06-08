import React from "react";
import BoardSquare from "../components/BoardSquare";
import Knight from "../components/Knight";
import { moveKnight, canMoveKnight } from "../Game";
import { DragDropContextProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

interface BoardProps {
  knightPosition: [number, number];
}

function renderSquare(i: number, knightPosition: [number, number]) {
  const x = i % 8;
  const y = Math.floor(i / 8);
  return (
    <div key={i} style={{ width: "12.5%", height: "12.5%" }}>
      <BoardSquare x={x} y={y}>
        {renderPiece(x, y, knightPosition)}
      </BoardSquare>
    </div>
  );
}

function renderPiece(
  x: number,
  y: number,
  [knightX, knightY]: [number, number]
) {
  if (x === knightX && y === knightY) {
    return <Knight />;
  }
}

function handleSquareClick(toX: number, toY: number) {
  if (canMoveKnight(toX, toY)) {
    moveKnight(toX, toY);
  }
}

const Board: React.FC<BoardProps> = function({ knightPosition }) {
  const squares = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i, knightPosition));
  }
  return (
    <DragDropContextProvider backend={HTML5Backend}>
      <div
        style={{
          width: "400px",
          height: "400px",
          display: "flex",
          flexWrap: "wrap",
          gap: "0px",
        }}
      >
        {squares}
      </div>
    </DragDropContextProvider>
  );
};
export default Board;
