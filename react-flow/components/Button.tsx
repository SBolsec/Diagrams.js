import * as React from "react";

import cx from "classnames";

export type ButtonProps = {
  className?: string;
  children: React.ReactNode;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  className = "",
  children,
  ...props
}: ButtonProps) {
  const buttonClassName = cx({
    "inline-flex items-center rounded-lg shadow-md mouse-pointer p-2": true,
    "bg-blue-500 hover:bg-blue-400 text-white": !className,
    [className]: className,
  });

  return (
    <button className={buttonClassName} {...props}>
      {children}
    </button>
  );
}
