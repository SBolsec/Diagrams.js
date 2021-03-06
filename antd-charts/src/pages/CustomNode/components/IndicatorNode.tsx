import * as React from "react";

export default function IndicatorNode(props: any) {
  const { size = { width: 120, height: 50 }, data } = props;
  const { width, height } = size;
  const {
    label = "Indicator Node",
    stroke = "#ccc",
    fill = "#fff",
    fontFill,
    fontSize,
  } = data;

  return (
    <div
      className="indicator-container"
      style={{
        position: "relative",
        display: "block",
        background: "#fff",
        border: "1px solid #84b2e8",
        borderRadius: "2px",
        padding: "10px 12px",
        overflow: "hidden",
        boxShadow: "0 1px 4px 0 rgba(0,0,0,0.20)",
        width,
        height,
        borderColor: stroke,
        backgroundColor: fill,
        color: fontFill,
        fontSize,
      }}
    >
      <div style={{ color: fontFill }}>{label}</div>
    </div>
  );
}
