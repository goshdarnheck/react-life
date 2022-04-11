import ReactDOM from "react-dom";
import Life from "../Life";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Life
      gridSize={50}
      cellSize={10}
      speed={200}
      paused={true}
    />,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
