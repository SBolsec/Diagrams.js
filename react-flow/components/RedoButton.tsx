import * as React from "react";

import { ArrowRightIcon } from "@heroicons/react/solid";

import cx from "classnames";

import Button from "./Button";
import { useDiagramContext } from "./DiagramProvider/DiagramProvider";

export default function RedoButton() {
  const { redo, canRedo } = useDiagramContext();

  const buttonClassName = cx({
    "bg-blue-300 hover:bg-blue-300": !canRedo,
  });

  return (
    <Button className={buttonClassName} disabled={!canRedo} onClick={redo}>
      <ArrowRightIcon className="h-6 w-6" />
    </Button>
  );
}
