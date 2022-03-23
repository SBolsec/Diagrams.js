import { Elements, FlowElement, Node } from "react-flow-renderer";

export enum HistoryActionKind {
  ADD = "ADD",
  SAVE = "SAVE",
  UNDO = "UNDO",
  REDO = "REDO",
  DRAG = "DRAG",
}

type HistoryAction =
  | {
      type: HistoryActionKind.ADD;
      payload: FlowElement;
    }
  | {
      type: HistoryActionKind.UNDO | HistoryActionKind.REDO;
      payload: null;
    }
  | {
      type: HistoryActionKind.SAVE;
      payload: Elements;
    }
  | {
      type: HistoryActionKind.DRAG;
      payload: Node;
    };

type HistoryState = {
  elements: Elements[];
  index: number;
};

export function reducer(
  state: HistoryState,
  { type, payload }: HistoryAction
): HistoryState {
  switch (type) {
    case HistoryActionKind.ADD: {
      if (state.index < state.elements.length - 1) {
        const newElements = state.elements.slice(0, state.index + 1);
        return {
          ...state,
          elements: [...newElements, [...newElements[state.index], payload]],
          index: state.index + 1,
        };
      }

      return {
        ...state,
        elements: [
          ...state.elements,
          [...state.elements[state.index], payload],
        ],
        index: state.index + 1,
      };
    }
    case HistoryActionKind.SAVE: {
      if (state.index < state.elements.length - 1) {
        return {
          ...state,
          elements: [...state.elements.slice(0, state.index + 1), payload],
          index: state.index + 1,
        };
      }

      return {
        ...state,
        elements: [...state.elements, payload],
        index: state.index + 1,
      };
    }
    case HistoryActionKind.UNDO: {
      const newIndex = state.index - 1;

      return {
        ...state,
        index: newIndex <= 0 ? 0 : newIndex,
      };
    }
    case HistoryActionKind.REDO: {
      const newIndex = state.index + 1;
      const maxIndex = state.elements.length - 1;

      return {
        ...state,
        index: newIndex >= maxIndex ? maxIndex : newIndex,
      };
    }
    case HistoryActionKind.DRAG: {
      const filtered = state.elements[state.index].filter(
        (node) => node.id !== payload.id
      );
      return {
        ...state,
        elements: [...state.elements, [...filtered, payload]],
        index: state.index + 1,
      };
    }
    default:
      return state;
  }
}
