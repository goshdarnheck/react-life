/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import examples from "../lib/examples";

const Examples = ({ handleSelectExample }) => (
  <div
    css={css`
      ul {
        list-style-type: none;
        max-height: 10em;
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
