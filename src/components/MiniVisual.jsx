import React from "react";

export function MiniVisual({ type = "window" }) {
  return (
    <div className={`mini-visual ${type}`}>
      <span></span>
      <span></span>
      <span></span>
      <i></i>
    </div>
  );
}
