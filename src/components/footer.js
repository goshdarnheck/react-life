/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ReactComponent as BackArrow } from "../images/back-arrow.svg";

const Footer = () => (
  <div
    css={css`
      bottom: 0;
      padding: 0.5em;
      position: absolute;
      text-align: center;

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
    `}
  >
    <a href="https://eyehack.com"><BackArrow />eyehack</a>
  </div>
);

export default Footer;
