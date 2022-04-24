import * as React from "react";

import { Layer, Rect, Stage } from "react-konva";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";

import DiagramProvider, { useDiagramContext } from "./context/DiagramContext";
import { DiagramElement } from "./context/types";

export default function App() {
  return (
    <div className="h-screen">
      <DiagramProvider>
        <ToolBar />
        <Diagram />
      </DiagramProvider>
    </div>
  );
}

function ToolBar() {
  const { addNode, undo, redo } = useDiagramContext();

  const handleCreateEntity = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { clientX: x, clientY: y } = event;
    addNode({ x, y: y - 56, width: 50, height: 50, type: "entity" });
  };

  const handleCreateRelationship = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const { clientX: x, clientY: y } = event;
    addNode({ x, y: y - 56, width: 50, height: 50, type: "relationship" });
  };

  return (
    <div className="flex space-x-4 py-2 px-4 bg-gray-400 text-white">
      <div
        className="px-4 py-2 ring ring-blue-500 rounded-lg bg-white text-black select-none"
        draggable={true}
        onDragEnd={handleCreateEntity}
      >
        Entity
      </div>
      <div
        className="px-4 py-2 ring ring-blue-500 rounded-lg bg-white text-black select-none"
        draggable={true}
        onDragEnd={handleCreateRelationship}
      >
        Relationship
      </div>

      <button
        className="inline-flex items-center rounded-lg shadow-md mouse-pointer p-2 bg-blue-500 hover:bg-blue-400 text-white"
        onClick={undo}
      >
        <ArrowLeftIcon className="h-6 w-6" />
      </button>
      <button
        className="inline-flex items-center rounded-lg shadow-md mouse-pointer p-2 bg-blue-500 hover:bg-blue-400 text-white"
        onClick={redo}
      >
        <ArrowRightIcon className="h-6 w-6" />
      </button>
    </div>
  );
}

function Diagram() {
  const { elements, drag } = useDiagramContext();

  const handleDrag = (
    event: KonvaEventObject<DragEvent>,
    node: DiagramElement
  ) => {
    drag({
      ...node,
      x: event.target.x(),
      y: event.target.y(),
    });
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight - 56}
      draggable={true}
    >
      <Layer>
        {elements
          .filter(({ type }) => type === "entity")
          .map((element) => (
            <Rect
              key={element.id}
              x={element.x}
              y={element.y}
              width={element.width}
              height={element.height}
              fill="red"
              draggable={true}
              onDragEnd={(event: KonvaEventObject<DragEvent>) =>
                handleDrag(event, element)
              }
            />
          ))}
      </Layer>
      <Layer>
        {elements
          .filter(({ type }) => type === "relationship")
          .map((element) => (
            <Rect
              key={element.id}
              x={element.x}
              y={element.y}
              width={element.width}
              height={element.height}
              fill="green"
              draggable={true}
              onDragEnd={(event: KonvaEventObject<DragEvent>) =>
                handleDrag(event, element)
              }
            />
          ))}
      </Layer>
    </Stage>
  );
}
