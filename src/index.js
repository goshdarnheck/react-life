import React from "react";
import ReactDOM from "react-dom";
import "normalize.css/normalize.css";
import "./index.css";
import Life from "./Life";

ReactDOM.render(
  <Life size={50} zoom={16} speed={250} paused={true} />,
  document.getElementById("root")
);
