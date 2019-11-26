import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import Life from "./Life";
import { SPEEDS } from "./lib/constants";

ReactDOM.render(
  <Life size={60} cellSize={12} speed={SPEEDS[2]} paused={true} />,
  document.getElementById("root")
);
