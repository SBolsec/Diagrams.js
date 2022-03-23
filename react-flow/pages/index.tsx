import * as React from "react";

import ReactFlow, {
  addEdge,
  Background,
  Connection,
  ConnectionMode,
  Controls,
  Edge,
  Elements,
  MiniMap,
  Node,
  OnLoadParams,
  removeElements,
  useStoreState,
} from "react-flow-renderer";

import BackgroundVariantSwitcher from "../components/BackgroundVariantSwitcher";
import DiagramProvider, {
  useDiagramContext,
} from "../components/DiagramProvider/DiagramProvider";
import DraggableElement from "../components/DraggableElement";
import RedoButton from "../components/RedoButton";
import SnapToGridButton from "../components/SnapToGridButton";
import Toolbar from "../components/Toolbar";
import UndoButton from "../components/UndoButton";
import EntityNode from "../components/EntityNode";
import RelationshipNode from "../components/RelationshipNode";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <DiagramProvider>
        <ToolBar />
        <Diagram />
      </DiagramProvider>
    </div>
  );
}

function ToolBar() {
  return (
    <Toolbar title="React Flow Demo">
      <Toolbar.Segment>
        <UndoButton />
        <RedoButton />
      </Toolbar.Segment>
      <Toolbar.Segment>
        <SnapToGridButton />
      </Toolbar.Segment>
      <Toolbar.Segment>
        <BackgroundVariantSwitcher />
      </Toolbar.Segment>
      <Toolbar.Segment>
        <DraggableElement
          label="Entity"
          type="entity"
          className="ring-2 ring-blue-500"
        />
        <DraggableElement
          label="Relationship"
          type="relationship"
          className="ring-2 ring-green-500"
        />
      </Toolbar.Segment>
    </Toolbar>
  );
}

const nodeTypes = {
  entity: EntityNode,
  relationship: RelationshipNode,
};

function Diagram() {
  const reactFlowWrapper = React.useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] =
    React.useState<OnLoadParams>();

  const {
    elements,
    snapGrid,
    backgroundVariant,
    addNode,
    save,
    onNodeDragStop,
  } = useDiagramContext();
  const snapToGrid = useStoreState((store) => store.snapToGrid);

  const onLoad = (_reactFlowInstance: OnLoadParams) => {
    setReactFlowInstance(_reactFlowInstance);
  };

  const onConnect = (connection: Edge | Connection) => {
    save(addEdge(connection, elements));
  };

  const onElementsRemove = (elementsToRemove: Elements) => {
    save(removeElements(elementsToRemove, elements));
  };

  const onDragOver = (event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const reactFlowBounds = reactFlowWrapper.current!.getBoundingClientRect();
    const type = event.dataTransfer.getData("application/reactflow");
    const newNode: Node = {
      id: "id",
      type: type,
      position: reactFlowInstance!.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }),
      data: {
        label: `${type} node`,
        handleCount: type === "entity" ? 3 : undefined,
        handlePosition: type === "entity" ? 3 : undefined,
      },
    };

    addNode(newNode);
  };

  return (
    <div className="flex flex-grow" ref={reactFlowWrapper}>
      <ReactFlow
        elements={elements}
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        deleteKeyCode={46}
        snapGrid={snapGrid}
        snapToGrid={snapToGrid}
        onlyRenderVisibleElements={true}
        onConnect={onConnect}
        onElementsRemove={onElementsRemove}
        onLoad={onLoad}
        onDragOver={onDragOver}
        onDrop={onDrop}
        onNodeDragStop={onNodeDragStop}
      >
        <Background variant={backgroundVariant} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
}
