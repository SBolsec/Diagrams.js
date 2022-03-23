import * as React from "react";

import { ArrowLeftIcon } from "@heroicons/react/solid";

import cx from "classnames";

import Button from "./Button";
import { useDiagramContext } from "./DiagramProvider/DiagramProvider";

export default function UndoButton() {
  const { undo, canUndo } = useDiagramContext();

  const buttonClassName = cx({
    "bg-blue-300 hover:bg-blue-300": !canUndo,
  });

  return (
    <Button className={buttonClassName} disabled={!canUndo} onClick={undo}>
      <ArrowLeftIcon className="h-6 w-6" />
    </Button>
  );
}
