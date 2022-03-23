import * as React from "react";

import cx from "classnames";
import { Handle, NodeProps, Position } from "react-flow-renderer";

const EntityNode = ({
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
  const handles = React.useMemo(
    () =>
      Array.from({ length: data.handleCount }, (x, i) => {
        const handleIdTop = `handle-${id}-${i}`;
        const handleIdBottom = `handle-${id}-${data.handleCount + i}`;
        return (
          <>
            <Handle
              key={handleIdTop}
              id={handleIdTop}
              type="source"
              position={Position.Top}
              style={{ left: 30 * i + data.handlePosition * 10 }}
            />
            <Handle
              key={handleIdBottom}
              id={handleIdBottom}
              type="source"
              position={Position.Bottom}
              style={{ left: 30 * i + data.handlePosition * 10 }}
              className="bg-blue-500"
            />
          </>
        );
      }),
    [data.handleCount, data.handlePosition]
  );

  const nodeClassName = cx({
    "bg-white border border-blue-500 rounded text-sm px-6 py-2 max-w-xs": true,
    "ring-1 ring-blue-500": selected,
  });

  return (
    <div className={nodeClassName}>
      {data.label}
      {handles}
      <Handle id={`handle-${id}-left`} type="source" position={Position.Left} />
      <Handle
        id={`handle-${id}-right`}
        type="source"
        position={Position.Right}
      />
    </div>
  );
};

export default React.memo(EntityNode);
