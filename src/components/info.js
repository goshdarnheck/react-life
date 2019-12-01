/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Info = ({ generation, births, deaths }) => (
  <div
    css={css`
      h1 {
        font-size: 1.4em;
        letter-spacing: 0.1em;
        text-align: center;
        margin-bottom: 1.2em;
      }

      ul {
        list-style-type: none;
        padding: 0;
        display: table;
      }

      li {
        display: table-row;
      }

      li span {
        display: table-cell;
      }

      li span:first-of-type {
        padding-right: 1em;
        text-align: right;
      }
    `}
  >
    <h1>
      React
      <br />
      Game of Life
    </h1>
    <ul>
      <li>
        <span>{generation}</span>
        <span>Generations</span>
      </li>
      <li>
        <span>{births}</span>
        <span>Births</span>
      </li>
      <li>
        <span>{deaths}</span>
        <span>Deaths</span>
      </li>
    </ul>
  </div>
);

export default Info;
