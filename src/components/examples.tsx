/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";
import examples from "../lib/examples";

interface exampleProps {
  handleSelectExample: (data: number[][]) => void;
}

const Examples: FunctionComponent<exampleProps> = ({ handleSelectExample }) => (
  <div
    css={css`
      ul {
        list-style-type: none;
        max-height: 10.2em;
        overflow: auto;
        padding: 0 0.3em 0 0;
      }

      li:not(:last-child) {
        letter-spacing: 0.1em;
        margin-bottom: 0.2em;
      }

      button {
        width: 100%;
      }

      small {
        font-size: 0.4em;
      }
    `}
  >
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
