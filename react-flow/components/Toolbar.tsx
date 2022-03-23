import * as React from "react";

type ToolbarProps = {
  title?: string;
  children: React.ReactNode;
};

type ToolbarSegmentProps = {
  children: React.ReactNode;
};

function Segment({ children }: ToolbarSegmentProps) {
  return <div className="flex space-x-2">{children}</div>;
}

function Toolbar({ title, children }: ToolbarProps) {
  const arrayChildren = React.Children.toArray(children);

  return (
    <div className="flex items-center py-4 px-3 bg-gray-800 text-white space-x-2">
      {title && <span className="font-bold">{title}</span>}

      {React.Children.map(arrayChildren, (child, index) => (
        <>
          <div className="flex space-x-2">{child}</div>
          {index !== arrayChildren.length - 1 && (
            <div className="border-l border-white py-5" />
          )}
        </>
      ))}
    </div>
  );
}

Toolbar.Segment = Segment;
export default Toolbar;
