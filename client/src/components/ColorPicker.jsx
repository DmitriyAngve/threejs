import React from "react";
import { SketchPicker } from "react-color";
import { useSnapshot } from "valtio";

import state from "../store";

const ColorPicker = () => {
  const snap = useSnapshot(state);
  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={snap.color}
        disableAlpha
        presetColors={[
          "#6EC8FF",
          "#80C9A1",
          "#A891D3",
          "#4BC0C8",
          "#8B6D9E",
          "#FF9F55",
          "#FFB97D",
          "#FFC14D",
          "#F05F57",
          "#FF80AB",
          "#C75EC4",
          "#FF9F9C",
        ]}
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
