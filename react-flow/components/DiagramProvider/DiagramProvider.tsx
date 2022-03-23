import * as React from "react";

import {
  BackgroundVariant,
  Elements,
  FlowElement,
  Node,
  ReactFlowProvider,
} from "react-flow-renderer";

import { HistoryActionKind, reducer } from "./reducer";

type DiagramContextType = {
  canUndo: boolean;
  canRedo: boolean;
  elements: Elements;
  snapGrid: [number, number];
  backgroundVariant: BackgroundVariant;
  setBackgroundVariant: (variant: BackgroundVariant) => void;
  addNode: (node: Node) => void;
  undo: () => void;
  redo: () => void;
  save: (elements: Elements) => void;
  onNodeDragStop: (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => void;
};

const DiagramContext = React.createContext<DiagramContextType>(
  {} as DiagramContextType
);

export const useDiagramContext = () => {
  return React.useContext(DiagramContext);
};

type DiagramContextProvider = {
  children: React.ReactNode;
};

export default function DiagramProvider({ children }: DiagramContextProvider) {
  return (
    <ReactFlowProvider>
      <ContextProvider>{children}</ContextProvider>
    </ReactFlowProvider>
  );
}

function ContextProvider({ children }: DiagramContextProvider) {
  const [history, dispatch] = React.useReducer(reducer, {
    elements: [[]],
    index: 0,
  });
  const elements = history.elements[history.index];

  const [idCounter, setIdCounter] = React.useState<number>(1);
  const [snapGrid, setSnapGrid] = React.useState<[number, number]>([16, 16]);
  const [backgroundVariant, setBackgroundVariant] =
    React.useState<BackgroundVariant>(BackgroundVariant.Dots);

  const addNode = (node: Node) => {
    const newNode: FlowElement = {
      ...node,
      id: `${node.type}-${idCounter}`,
    };

    dispatch({ type: HistoryActionKind.ADD, payload: newNode });
    setIdCounter(idCounter + 1);
  };

  const undo = () => {
    dispatch({ type: HistoryActionKind.UNDO, payload: null });
  };

  const redo = () => {
    dispatch({ type: HistoryActionKind.REDO, payload: null });
  };

  const save = (newElements: Elements) => {
    dispatch({ type: HistoryActionKind.SAVE, payload: newElements });
  };

  const onNodeDragStop = (
    event: React.MouseEvent<Element, MouseEvent>,
    node: Node
  ) => {
    dispatch({ type: HistoryActionKind.DRAG, payload: node });
  };

  return (
    <DiagramContext.Provider
      value={{
        canUndo: history.index > 0,
        canRedo: history.index < history.elements.length - 1,
        elements,
        snapGrid,
        backgroundVariant,
        setBackgroundVariant,
        addNode,
        undo,
        redo,
        save,
        onNodeDragStop,
      }}
    >
      {children}
    </DiagramContext.Provider>
  );
}
