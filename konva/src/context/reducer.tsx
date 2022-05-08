import * as React from "react";

import { ConnectionLine, DiagramElement, HistoryActionType } from "./types";

export type HistoryState = {
  elements: DiagramElement[][];
  connections: ConnectionLine[][];
  index: number;
};

type AddAction = {
  type: HistoryActionType.ADD;
  payload: DiagramElement;
};

type UndoAction = {
  type: HistoryActionType.UNDO;
  payload?: null;
};

type RedoAction = {
  type: HistoryActionType.REDO;
  payload?: null;
};

type DragAction = {
  type: HistoryActionType.DRAG;
  payload: DiagramElement;
};

type ConnectAction = {
  type: HistoryActionType.CONNECT;
  payload: ConnectionLine;
};

type Action = AddAction | UndoAction | RedoAction | DragAction | ConnectAction;

export function reducer(state: HistoryState, { type, payload }: Action) {
  switch (type) {
    case HistoryActionType.ADD:
      return handleAddElement(state, payload);
    case HistoryActionType.UNDO:
      return handleUndo(state);
    case HistoryActionType.REDO:
      return handleRedo(state);
    case HistoryActionType.DRAG:
      return handleDrag(state, payload);
    case HistoryActionType.CONNECT:
      return handleConnect(state, payload);
    default:
      return state;
  }
}

function handleAddElement(state: HistoryState, element: DiagramElement) {
  if (state.index < state.elements.length - 1) {
    const newElements = state.elements.slice(0, state.index + 1);

    return {
      ...state,
      elements: [...newElements, [...newElements[state.index], element]],
      index: state.index + 1,
    };
  }

  return {
    ...state,
    elements: [...state.elements, [...state.elements[state.index], element]],
    connections: [...state.connections, [...state.connections[state.index]]],
    index: state.index + 1,
  };
}

function handleUndo(state: HistoryState) {
  const newIndex = state.index - 1;

  return {
    ...state,
    index: newIndex <= 0 ? 0 : newIndex,
  };
}

function handleRedo(state: HistoryState) {
  const newIndex = state.index + 1;
  const maxIndex = state.elements.length - 1;

  return {
    ...state,
    index: newIndex >= maxIndex ? maxIndex : newIndex,
  };
}

function handleDrag(state: HistoryState, element: DiagramElement) {
  const filtered = state.elements[state.index].filter(
    (node) => node.id !== element.id
  );

  return {
    ...state,
    elements: [...state.elements, [...filtered, element]],
    connections: [...state.connections, [...state.connections[state.index]]],
    index: state.index + 1,
  };
}

function handleConnect(state: HistoryState, connection: ConnectionLine) {
  return {
    ...state,
    elements: [...state.elements, [...state.elements[state.index]]],
    connections: [
      ...state.connections,
      [...state.connections[state.index], connection],
    ],
    index: state.index + 1,
  };
}
