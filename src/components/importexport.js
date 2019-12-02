/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const ImportExport = ({ handleExport }) => (
  <div
    css={css`
    margin-bottom: 1em;
      button {
        width: 100%;
      }
    `}
  >
    <h2>Import / Export</h2>
    <button onClick={handleExport}>Export to Console</button>
  </div>
);

export default ImportExport;
