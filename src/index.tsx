import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import Life from "./Life";
import { SPEEDS, CELL_SIZES, GRID_SIZES } from "./lib/constants";

ReactDOM.render(
  <Life gridSize={GRID_SIZES[4]} cellSize={CELL_SIZES[9]} speed={SPEEDS[7]} paused={true} />,
  document.getElementById("root")
);
