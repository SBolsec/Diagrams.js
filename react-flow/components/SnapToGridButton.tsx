import * as React from "react";

import { ViewGridIcon } from "@heroicons/react/solid";

import cx from "classnames";
import { useStoreActions, useStoreState } from "react-flow-renderer";

import Button from "./Button";

export default function SnapToGridButton() {
  const snapToGrid = useStoreState((store) => store.snapToGrid);
  const setSnapToGrid = useStoreActions((store) => store.setSnapToGrid);

  const buttonClassName = cx({
    "bg-green-600 hover:bg-green-500": snapToGrid,
    "bg-red-600 hover:bg-red-500": !snapToGrid,
  });

  return (
    <Button
      className={buttonClassName}
      onClick={() => setSnapToGrid(!snapToGrid)}
    >
      <ViewGridIcon className="h-6 w-6" />
    </Button>
  );
}
