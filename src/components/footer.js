/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ReactComponent as BackArrow } from "../images/back-arrow.svg";

const Footer = () => (
  <div
    css={css`
      bottom: 0;
      padding: 0.5em;
      position: absolute;

      a {
        color: #fff;
        opacity: 0.4;
        text-decoration: none;
        transition: opacity 0.3s;
      }

      a:hover {
        opacity: 1;
      }

      svg {
        vertical-align: text-bottom;
        margin-right: 0.5em;
        width: 1em;
      }

      ul {
        padding: 0;
      }

      li {
        display: inline-block;
      }

      li:not(:last-child):after {
        content: "|";
        padding: 0 0.5em;
      }
    `}
  >
    <ul>
      <li><a href="https://eyehack.com"><BackArrow />Eyehack</a></li>
      <li><a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life">Conway's Game of Life</a></li>
    </ul>
  </div>
);

export default Footer;