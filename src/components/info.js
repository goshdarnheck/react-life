/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Info = ({ generation, speed, births, deaths }) => (
  <div
    css={css`
      ul {
        list-style-type: none;
        padding: 0;
      }

      li {
        display: flex;
        justify-content: space-between;
      }

      li span:last-child {
        overflow: hidden;
        text-overflow: ellipsis;
      }
    `}
  >
    <h2>Game of Life</h2>
    <ul>
      <li>
        <span>Generation:</span> <span>{generation}</span>
      </li>
      <li>
        <span>Births:</span> <span>{births}</span>
      </li>
      <li>
        <span>Deaths:</span> <span>{deaths}</span>
      </li>
      <li>
        <span>Speed:</span> <span>{speed}ms</span>
      </li>
    </ul>
  </div>
);

export default Info;
