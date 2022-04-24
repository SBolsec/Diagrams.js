import * as React from "react";

import { DiagramElement, HistoryActionType } from "./types";

export type HistoryState = {
  elements: DiagramElement[][];
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

type Action = AddAction | UndoAction | RedoAction | DragAction;

function isAddAction(action: Action): action is AddAction {
  return action.type === HistoryActionType.ADD;
}

function isUndoAction(action: Action): action is UndoAction {
  return action.type === HistoryActionType.UNDO;
}

function isRedoAction(action: Action): action is RedoAction {
  return action.type === HistoryActionType.REDO;
}

function isDragAction(action: Action): action is DragAction {
  return action.type === HistoryActionType.DRAG;
}

export function reducer(state: HistoryState, action: Action) {
  if (isAddAction(action)) return handleAddElement(state, action.payload);
  else if (isUndoAction(action)) return handleUndo(state);
  else if (isRedoAction(action)) return handleRedo(state);
  else if (isDragAction(action)) return handleDrag(state, action.payload);
  else return state;
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
    index: state.index + 1,
  };
}
