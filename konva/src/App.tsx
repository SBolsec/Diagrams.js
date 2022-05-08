import * as React from "react";

import { Layer, Line, Rect, Stage } from "react-konva";
import Konva from "konva";

import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/solid";
import cx from "classnames";

import DiagramProvider, { useDiagramContext } from "./context/DiagramContext";
import { DiagramElement, EditorMode } from "./context/types";
import KonvaEventObject = Konva.KonvaEventObject;

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
  const { addNode, undo, redo, editorMode, setEditorMode } =
    useDiagramContext();

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

  const getModeClass = (mode: EditorMode) =>
    cx({
      "px-4 py-2": true,
      "bg-blue-500": mode === editorMode,
      "bg-gray-400": mode !== editorMode,
    });

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
      <button
        onClick={() => setEditorMode(EditorMode.SELECT)}
        className={getModeClass(EditorMode.SELECT)}
      >
        SELECT
      </button>
      <button
        onClick={() => setEditorMode(EditorMode.CONNECT)}
        className={getModeClass(EditorMode.CONNECT)}
      >
        CONNECT
      </button>
    </div>
  );
}

function Diagram() {
  const {
    elements,
    connections,
    drag,
    editorMode,
    startConnect,
    endConnect,
    firstConnectedNode,
  } = useDiagramContext();

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

  const draggable = editorMode === EditorMode.SELECT;

  const onMouseDown = (
    event: KonvaEventObject<MouseEvent>,
    node: DiagramElement
  ) => {
    if (editorMode === EditorMode.CONNECT) {
      startConnect(node);
    }
  };

  const onMouseUp = (
    event: KonvaEventObject<MouseEvent>,
    node: DiagramElement
  ) => {
    if (editorMode === EditorMode.CONNECT) {
      endConnect(node);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight - 56}
      draggable={draggable}
    >
      <Layer>
        {connections.map((connection, index) => {
          const a: DiagramElement = elements.filter(
            ({ id }) => id === connection.id1
          )[0];
          const b: DiagramElement = elements.filter(
            ({ id }) => id === connection.id2
          )[0];

          return (
            <Line
              key={index}
              points={[
                a.x + a.width / 2,
                a.y + a.height / 2,
                b.x + b.width / 2,
                b.y + b.height / 2,
              ]}
              stroke="black"
            />
          );
        })}
      </Layer>
      <Layer>
        {elements
          .filter(({ type }) => type === "entity")
          .map((element: DiagramElement) => (
            <Rect
              key={element.id}
              x={element.x}
              y={element.y}
              width={element.width}
              height={element.height}
              fill="red"
              stroke={element === firstConnectedNode ? "black" : ""}
              draggable={draggable}
              onDragEnd={(event: KonvaEventObject<DragEvent>) =>
                handleDrag(event, element)
              }
              onMouseDown={(event) => onMouseDown(event, element)}
              onMouseUp={(event) => onMouseUp(event, element)}
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
              stroke={element === firstConnectedNode ? "black" : ""}
              draggable={draggable}
              onDragEnd={(event: KonvaEventObject<DragEvent>) =>
                handleDrag(event, element)
              }
              onMouseDown={(event) => onMouseDown(event, element)}
              onMouseUp={(event) => onMouseUp(event, element)}
            />
          ))}
      </Layer>
    </Stage>
  );
}
