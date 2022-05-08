import * as React from "react";

export type DiagramContextProviderProps = {
  children: React.ReactNode;
};

export type DiagramElement = DiagramNode;

export type DiagramElementType = "entity" | "relationship" | "connection";

export type DiagramNode = {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  type: DiagramElementType;
};

export type ConnectionLine = {
  id1: number;
  id2: number;
};

export type CreateDiagramNodeCommand = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: DiagramElementType;
};

export type DiagramContextType = {
  editorMode: EditorMode;
  firstConnectedNode: DiagramNode | null;
  elements: DiagramElement[];
  connections: ConnectionLine[];
  addNode: (element: CreateDiagramNodeCommand) => void;
  undo: () => void;
  redo: () => void;
  drag: (element: DiagramElement) => void;
  setEditorMode: (editorMode: EditorMode) => void;
  startConnect: (element: DiagramNode | null) => void;
  endConnect: (element: DiagramNode) => void;
};

export enum HistoryActionType {
  ADD = "ADD",
  SAVE = "SAVE",
  UNDO = "UNDO",
  REDO = "REDO",
  DRAG = "DRAG",
  CONNECT = "CONNECT",
}

export enum EditorMode {
  SELECT = "SELECT",
  CONNECT = "CONNECT",
}
