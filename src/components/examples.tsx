import React, { FunctionComponent } from "react";
import examples from "../lib/examples";

interface exampleProps {
  handleSelectExample: (data: number[][]) => void;
}

const Examples: FunctionComponent<exampleProps> = ({ handleSelectExample }) => (
  <div className="examples">
    <h2>
      Examples <small>(Click to load)</small>
    </h2>
    <ul>
      {examples.map((example, i) => {
        return (
          <li key={i}>
            <button onClick={() => handleSelectExample(example.data)}>
              {example.name}
            </button>
          </li>
        );
      })}
    </ul>
  </div>
);

export default Examples;
