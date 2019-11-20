/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Info = ({ generation, speed }) => (
  <div
    css={css`
      ul {
        list-style-type: none;
        padding: 0;
      }
    `}
  >
    <h2>Game of Life</h2>
    <ul>
      <li>Generation: {generation}</li>
      <li>Speed: {speed}ms</li>
    </ul>
  </div>
);

export default Info;
