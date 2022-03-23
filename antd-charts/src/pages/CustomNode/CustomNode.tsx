import React from "react";

import { Flowchart } from "@ant-design/flowchart";

import IndicatorNode from "./components/IndicatorNode";

export default function DemoFlowchart() {
  return (
    <div style={{ height: 600 }}>
      <Flowchart
        onSave={(d) => {
          console.log(d);
        }}
        toolbarPanelProps={{
          position: {
            top: 0,
            left: 0,
            right: 0,
          },
        }}
        scaleToolbarPanelProps={{
          layout: "horizontal",
          position: {
            right: 0,
            top: -40,
          },
          style: {
            background: "transparent",
          },
        }}
        canvasProps={{
          position: {
            top: 40,
            left: 0,
            right: 0,
            bottom: 0,
          },
        }}
        nodePanelProps={{
          position: { width: 160, top: 40, bottom: 0, left: 0 },
          defaultActiveKey: ["custom"], // ['custom', 'official']
          registerNode: {
            title: "Nodes",
            nodes: [
              {
                component: IndicatorNode,
                popover: () => <div>Popover</div>,
                name: "custom-node-indicator",
                width: 120,
                height: 50,
                label: "Indicator Node",
              },
            ],
          },
        }}
        detailPanelProps={{
          position: { width: 200, top: 40, bottom: 0, right: 0 },
        }}
      />
    </div>
  );
}
