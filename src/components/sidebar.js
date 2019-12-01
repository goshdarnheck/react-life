/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Sidebar = ({ children }) => (
  <div
    css={css`
      background-color: #f40;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100%;
      padding: 0 1em;
      width: 24rem;

      h2 {
        font-size: 1.2em;
        letter-spacing: 0.1em;
      }

      button {
        background: #333;
        border: 0.2em #555 solid;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        margin: 0;
        text-align: center;
        text-decoration: none;
        transition: background 250ms ease-in-out, transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      button:hover,
      button:focus {
        outline: 1px dashed #999;
        outline-offset: -1px;
      }

      button[disabled] {
        opacity: 0.5;
      }
    `}
  >
    {children}
  </div>
);

export default Sidebar;
