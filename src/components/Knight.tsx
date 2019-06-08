import React from "react";
import { ItemTypes } from "../Constants";
import { DragSource } from "react-dnd";

const knightSource = {
  beginDrag(props: any) {
    return {};
  },
};

function collect(connect: any, monitor: any) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

interface KnightProps {
  connectDragSource: any;
  isDragging: any;
}

const Knight: React.FC<KnightProps> = function({
  connectDragSource,
  isDragging,
}) {
  return connectDragSource(
    <div
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: "bold",
        cursor: "move",
      }}
    >
      ♘
    </div>
  );
};

export default DragSource(ItemTypes.KNIGHT, knightSource, collect)(Knight);
