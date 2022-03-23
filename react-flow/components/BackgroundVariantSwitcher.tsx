import * as React from "react";

import { RadioGroup } from "@headlessui/react";
import { HashtagIcon } from "@heroicons/react/outline";
import { DotsHorizontalIcon } from "@heroicons/react/solid";

import cx from "classnames";
import { BackgroundVariant } from "react-flow-renderer";

import { useDiagramContext } from "./DiagramProvider/DiagramProvider";
import Button from "./Button";

export default function BackgroundVariantSwitcher() {
  const { backgroundVariant, setBackgroundVariant } = useDiagramContext();
  const [variant, setVariant] = React.useState(backgroundVariant);

  const onChange = (selectedVariant: BackgroundVariant) => {
    setVariant(selectedVariant);
    setBackgroundVariant(selectedVariant);
  };

  const getClassName = (a: BackgroundVariant): string => {
    return cx({
      "bg-green-600 hover:bg-green-500": backgroundVariant === a,
    });
  };

  return (
    <RadioGroup value={variant} onChange={onChange} className="flex space-x-2">
      <RadioGroup.Option value={BackgroundVariant.Lines}>
        {({ active, checked }) => (
          <Button className={getClassName(BackgroundVariant.Lines)}>
            <HashtagIcon className="h-6" />
          </Button>
        )}
      </RadioGroup.Option>
      <RadioGroup.Option value={BackgroundVariant.Dots}>
        {({ active, checked }) => (
          <Button className={getClassName(BackgroundVariant.Dots)}>
            <DotsHorizontalIcon className="h-6" />
          </Button>
        )}
      </RadioGroup.Option>
    </RadioGroup>
  );
}
