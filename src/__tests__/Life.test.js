import React from "react";
import ReactDOM from "react-dom";
import Life from "../Life";
import { SPEEDS, CELL_SIZES, GRID_SIZES } from "../lib/constants";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Life
      gridSize={GRID_SIZES[4]}
      cellSize={CELL_SIZES[9]}
      speed={SPEEDS[7]}
      paused={true}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
