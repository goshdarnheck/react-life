import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import Life from "./Life";

ReactDOM.render(
  <Life gridSize={50} cellSize={10} speed={200} paused={true} />,
  document.getElementById("root")
);
