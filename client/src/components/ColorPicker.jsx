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
          "#FF9F55",
          "#80C9A1",
          "#F05F57",
          "#A891D3",
          "#FFC14D",
          "#6EC8FF",
          "#C75EC4",
          "#FF80AB",
          "#8B6D9E",
          "#FFB97D",
          "#4BC0C8",
          "#FF9F9C",
        ]}
        onChange={(color) => (state.color = color.hex)}
      />
    </div>
  );
};

export default ColorPicker;
