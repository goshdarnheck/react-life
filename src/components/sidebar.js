/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Sidebar = ({ children }) => (
  <div
    css={css`
      background-color: #f40;
      flex-shrink: 0;
      height: 100%;
      padding: 0 2rem;
      width: 20rem;
    `}
  >
    {children}
  </div>
);

export default Sidebar;
