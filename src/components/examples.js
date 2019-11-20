/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import examples from "../lib/examples";

const Examples = ({ handleSelectExample }) => (
  <div css={css``}>
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
