import * as React from "react";

import cx from "classnames";

type DraggableElementProps = {
  className?: string;
  type: string;
  label: string;
};

export default function DraggableElement({
  className = "",
  type,
  label,
}: DraggableElementProps) {
  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("application/reactflow", type);
    event.dataTransfer.effectAllowed = "move";
  };

  const elementClassName = cx({
    "bg-white text-black p-2 rounded cursor-move": true,
    [className]: true,
  });

  return (
    <div
      className={elementClassName}
      draggable={true}
      onDragStart={(event: React.DragEvent<HTMLDivElement>) =>
        onDragStart(event)
      }
    >
      {label}
    </div>
  );
}
