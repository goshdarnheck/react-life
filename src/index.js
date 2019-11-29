import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import Life from "./Life";
import { SPEEDS, CELL_SIZES } from "./lib/constants";

ReactDOM.render(
  <Life size={60} cellSize={CELL_SIZES[7]} speed={SPEEDS[2]} paused={true} />,
  document.getElementById("root")
);
