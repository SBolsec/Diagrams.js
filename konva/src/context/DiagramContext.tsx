import * as React from "react";

import {
  CreateDiagramNodeCommand,
  DiagramContextProviderProps,
  DiagramContextType,
  DiagramElement,
  HistoryActionType,
} from "./types";
import { HistoryState, reducer } from "./reducer";

const initialState: HistoryState = {
  elements: [[]],
  index: 0,
};

const DiagramContext = React.createContext<DiagramContextType>(
  {} as DiagramContextType
);

export const useDiagramContext = () => React.useContext(DiagramContext);

export default function DiagramProvider({
  children,
}: DiagramContextProviderProps) {
  const [history, dispatch] = React.useReducer(reducer, initialState);
  const elements = history.elements[history.index];

  const [idCounter, setIdCounter] = React.useState<number>(1);

  const addNode = (nodeCommand: CreateDiagramNodeCommand) => {
    dispatch({
      type: HistoryActionType.ADD,
      payload: { id: idCounter, ...nodeCommand },
    });
    setIdCounter(idCounter + 1);
  };

  const drag = (element: DiagramElement) =>
    dispatch({ type: HistoryActionType.DRAG, payload: element });

  const undo = () => dispatch({ type: HistoryActionType.UNDO });

  const redo = () => dispatch({ type: HistoryActionType.REDO });

  const value = { elements, addNode, undo, redo, drag };

  return (
    <DiagramContext.Provider value={value}>{children}</DiagramContext.Provider>
  );
}
