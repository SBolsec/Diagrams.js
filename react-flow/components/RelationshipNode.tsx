import * as React from "react";

import cx from "classnames";
import { Handle, NodeProps, Position } from "react-flow-renderer";

const RelationshipNode = ({
  id,
  type,
  data,
  selected,
  isConnectable,
  xPos,
  yPos,
  targetPosition = Position.Top,
  sourcePosition = Position.Bottom,
  isDragging,
  dragHandle,
}: NodeProps) => {
  const nodeClassName = cx({
    "bg-white border border-green-500 rounded text-sm px-6 py-2 max-w-xs": true,
    "ring-1 ring-green-500": selected,
  });

  return (
    <div className={nodeClassName}>
      {data.label}
      <Handle id={`handle-${id}-left`} type="source" position={Position.Left} />
      <Handle
        id={`handle-${id}-right`}
        type="source"
        position={Position.Right}
      />
    </div>
  );
};

export default React.memo(RelationshipNode);
