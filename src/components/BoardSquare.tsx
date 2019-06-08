import React from "react";
import Square from "./Square";
import { canMoveKnight, moveKnight } from "../Game";
import { ItemTypes } from "../Constants";
import { DropTarget } from "react-dnd";

const squareTarget = {
  canDrop(props: any) {
    return canMoveKnight(props.x, props.y);
  },

  drop(props: any) {
    moveKnight(props.x, props.y);
  },
};

function collect(connect: any, monitor: any) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

function renderOverlay(color: string) {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        height: "100%",
        width: "100%",
        zIndex: 1,
        opacity: 0.5,
        backgroundColor: color,
      }}
    />
  );
}

interface BoardSquareProps {
  x: number;
  y: number;
  connectDropTarget: any;
  isOver: any;
  canDrop: any;
}

const BoardSquare: React.FC<BoardSquareProps> = function({
  x,
  y,
  connectDropTarget,
  isOver,
  canDrop,
  children,
}) {
  const black = (x + y) % 2 === 1;

  return connectDropTarget(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      <Square black={black}>{children}</Square>
      {isOver && !canDrop && renderOverlay("red")}
      {!isOver && canDrop && renderOverlay("yellow")}
      {isOver && canDrop && renderOverlay("green")}
    </div>
  );
};

export default DropTarget(ItemTypes.KNIGHT, squareTarget, collect)(BoardSquare);
