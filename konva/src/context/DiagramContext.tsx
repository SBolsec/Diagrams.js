import * as React from "react";

import {
  CreateDiagramNodeCommand,
  DiagramContextProviderProps,
  DiagramContextType,
  DiagramElement,
  EditorMode,
  HistoryActionType,
} from "./types";
import { HistoryState, reducer } from "./reducer";

const initialState: HistoryState = {
  elements: [[]],
  connections: [[]],
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
  const connections = history.connections[history.index];

  const [idCounter, setIdCounter] = React.useState<number>(1);
  const [editorMode, setEditorMode] = React.useState<EditorMode>(
    EditorMode.SELECT
  );
  const [firstConnectedNode, setFirstConnectedNode] =
    React.useState<DiagramElement | null>(null);

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

  const startConnect = (element: DiagramElement | null) => {
    if (!firstConnectedNode) {
      setFirstConnectedNode(element);
    } else {
      endConnect(element!);
    }
  };

  const endConnect = (element: DiagramElement) => {
    if (firstConnectedNode && firstConnectedNode.id !== element.id) {
      dispatch({
        type: HistoryActionType.CONNECT,
        payload: {
          id1: firstConnectedNode.id,
          id2: element.id,
        },
      });
      setFirstConnectedNode(null);
    }
  };

  const value = {
    elements,
    connections,
    firstConnectedNode,
    addNode,
    undo,
    redo,
    drag,
    editorMode,
    setEditorMode,
    startConnect,
    endConnect,
  };

  return (
    <DiagramContext.Provider value={value}>{children}</DiagramContext.Provider>
  );
}
