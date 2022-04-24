import * as React from "react";

import {Layer, Rect, Stage, Transformer} from "react-konva";
import Konva from "konva";

import {ArrowLeftIcon, ArrowRightIcon} from "@heroicons/react/solid";

import DiagramProvider, {useDiagramContext} from "./context/DiagramContext";
import {DiagramElement} from "./context/types";
import KonvaEventObject = Konva.KonvaEventObject;

export default function App() {
  return (
    <div className="h-screen">
      <DiagramProvider>
        <ToolBar/>
        <Diagram/>
      </DiagramProvider>
    </div>
  );
}

function ToolBar() {
  const {addNode, undo, redo} = useDiagramContext();

  const handleCreateEntity = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const {clientX: x, clientY: y} = event;
    addNode({x, y: y - 56, width: 50, height: 50, type: "entity"});
  };

  const handleCreateRelationship = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const {clientX: x, clientY: y} = event;
    addNode({x, y: y - 56, width: 50, height: 50, type: "relationship"});
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
        <ArrowLeftIcon className="h-6 w-6"/>
      </button>
      <button
        className="inline-flex items-center rounded-lg shadow-md mouse-pointer p-2 bg-blue-500 hover:bg-blue-400 text-white"
        onClick={redo}
      >
        <ArrowRightIcon className="h-6 w-6"/>
      </button>
    </div>
  );
}

/*
Multiple selection
https://codesandbox.io/s/react-konva-multiple-selection-forked-7mnl3r?file=/src/index.js
 */

function Diagram() {
  const {elements, selectedElementId, drag, clearSelect} = useDiagramContext();

  const layerRef = React.useRef<Konva.Layer>(null);
  const transformerRef = React.useRef<Konva.Transformer>(null);
  const selectionRectRef = React.useRef<Konva.Rect>(null);
  const selectionRef = React.useRef<Konva.Rect & any>({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  // @ts-ignore
  const konva = window.Konva;

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

  const checkDeselect = (event: KonvaEventObject<any>) => {
    if (event.target === event.target.getStage()) { // clicked on empty
      clearSelect();
      transformerRef.current!.nodes([]);
    }
  }

  const updateSelectionRect = () => {
    const node = selectionRectRef.current;
    const {visible, x1, y1, x2, y2} = selectionRef.current;

    if (node) {
      node.setAttrs({
        visible,
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x1 - x2),
        height: Math.abs(y1 - y2),
        fill: "rgba(0, 161, 255, 0.3)",
      });
      node.getLayer()!.draw();
    }
  }

  const onMouseDown = (event: KonvaEventObject<MouseEvent>) => {
    const isElement = event.target.findAncestor(".elements-container");
    const isTransformer = event.target.findAncestor("Transformer");
    if (isElement || isTransformer) {
      return;
    }

    const pos = event.target.getStage()!.getPointerPosition()!;
    selectionRef.current.visible = true;
    selectionRef.current.x1 = pos.x;
    selectionRef.current.y1 = pos.y;
    selectionRef.current.x2 = pos.x;
    selectionRef.current.y2 = pos.y;

    updateSelectionRect();
  }

  const onMouseMove = (event: KonvaEventObject<MouseEvent>) => {
    if (selectionRef.current.visible) {
      const pos = event.target.getStage()!.getPointerPosition()!;
      selectionRef.current.x2 = pos.x;
      selectionRef.current.y2 = pos.y;

      updateSelectionRect();
    }
  }

  const onMouseUp = (event: KonvaEventObject<MouseEvent>) => {
    if (selectionRef.current.visible) {
      const selBox = selectionRectRef.current!.getClientRect();
      const rectElements = layerRef.current!.find(".rect");

      const selectedElements = rectElements.filter((element) =>
        Konva.Util.haveIntersection(selBox, element.getClientRect()));

      console.log(selBox, rectElements, elements, selectedElements);

      transformerRef.current!.nodes(selectedElements);

      selectionRef.current.visible = false;
      updateSelectionRect();
    }
  }

  const onClick = (event: KonvaEventObject<MouseEvent>) => {
    // if we are selecting with rect, do nothing
    if (selectionRectRef.current!.visible()) {
      return;
    }

    const stage = event.target.getStage();
    const layer = layerRef.current!;
    const tr = transformerRef.current!;

    // if click on empty area - remove all selections
    if (event.target === stage) {
      clearSelect();
      tr.nodes([]);
      layer.draw();
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!event.target.hasName(".rect")) {
      return;
    }
  }

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight - 56}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={checkDeselect}
      onClick={onClick}
    >
      <Layer ref={layerRef}>
        {elements.map((element) => (
            <Rect
              key={element.id}
              x={element.x}
              y={element.y}
              width={element.width}
              height={element.height}
              fill={element.type === "entity" ? "red" : "green"}
              isSelected={element.id === selectedElementId}
              draggable={true}
              onDragEnd={(event: KonvaEventObject<DragEvent>) =>
                handleDrag(event, element)
              }
              onSelect={(event: KonvaEventObject<any>) => {
                console.log("select");
              }}
            />
          ))}
        <Transformer
          ref={transformerRef}
          boundBoxFunc={(oldBox, newBox) => {
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
        <Rect fill="rgba(0, 0, 255, 0.5)" ref={selectionRectRef}/>
      </Layer>
    </Stage>
  );
}
