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

export type CreateDiagramNodeCommand = {
  x: number;
  y: number;
  width: number;
  height: number;
  type: DiagramElementType;
};

export type DiagramContextType = {
  elements: DiagramElement[];
  selectedElementId: number;
  addNode: (element: CreateDiagramNodeCommand) => void;
  undo: () => void;
  redo: () => void;
  drag: (element: DiagramElement) => void;
  clearSelect: () => void;
};

export enum HistoryActionType {
  ADD = "ADD",
  SAVE = "SAVE",
  UNDO = "UNDO",
  REDO = "REDO",
  DRAG = "DRAG",
}

export enum ActionType {
  SELECT = "SELECT",
  CONNECT = "CONNECT",
}
