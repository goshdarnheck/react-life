/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Sidebar = ({ children }) => (
  <div
    css={css`
      background-color: #f90;
      flex-shrink: 0;
      height: 100%;
      padding: 2rem;
      width: 20rem;
    `}
  >
    {children}
  </div>
);

export default Sidebar;
