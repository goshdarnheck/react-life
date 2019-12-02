/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Sidebar = ({ children }) => (
  <div
    css={css`
      background-color: #645b55;
      display: flex;
      flex-direction: column;
      flex-shrink: 0;
      height: 100%;
      padding: 0 1em;

      h2 {
        font-size: 1.2em;
        letter-spacing: 0.1em;
        text-shadow: 2px 2px 0 rgba(0, 0, 0, 0.3);
      }

      button {
        background: #333;
        border: 3px #bbb0aa solid;
        color: #fff;
        cursor: pointer;
        display: inline-block;
        margin: 0;
        padding: 0 0.5em 0.14em 0.5em;
        text-align: center;
        text-decoration: none;
        transition: background 250ms ease-in-out, transform 150ms ease;
        -webkit-appearance: none;
        -moz-appearance: none;
      }

      button:hover,
      button:focus {
        outline: 1px solid #fff;
        outline-offset: -2px;
      }

      button[disabled] {
        cursor: default;
        opacity: 0.5;
      }

      button[disabled]:hover,
      button[disabled]:focus {
        outline: none;
      }

      @media only screen and (min-width: 768px) {
        min-height: 100vh;
        width: 24rem;
      }
    `}
  >
    {children}
  </div>
);

export default Sidebar;
