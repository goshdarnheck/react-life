/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Info = ({ generation, births, deaths }) => (
  <div
    css={css`
      h1 {
        font-size: 1.4em;
        letter-spacing: 0.1em;
        margin-bottom: 0.8em;
        text-align: center;
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
      }

      ul {
        background-color: #000;
        border-radius: 0.2em;
        color: #fff;
        display: table;
        list-style-type: none;
        margin-bottom: 1.2em;
        padding: 0.5em 0;
        width: 100%;
      }

      li {
        display: table-row;
      }

      li span {
        display: table-cell;
      }

      li span:first-of-type {
        min-width: 4em;
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
