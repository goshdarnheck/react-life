/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import examples from "../lib/examples";

const Examples = ({ handleSelectExample }) => (
  <div
    css={css`
      ul {
        list-style-type: none;
        padding: 0;
      }

      button {
        width: 100%;
      }
    `}
  >
    <h2>Examples</h2>
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
