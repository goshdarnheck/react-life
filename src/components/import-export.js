/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import { CopyToClipboard } from "react-copy-to-clipboard";

const ImportExport = ({
  handleExport,
  handleImport,
  handleDataChange,
  exportData
}) => (
  <div
    css={css`
      margin-bottom: 1em;

      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li > div:first-of-type {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.5em;

        button {
          width: 48%;
        }
      }

      button {
        width: 100%;
      }

      textarea {
        border: 3px #bbb0aa solid;
        font-size: 0.6em;
        height: 7em;
        margin-bottom: 0.5em;
        width: 100%;
      }
    `}
  >
    <h2>Data Controls</h2>
    <ul>
      <li>
        <div>
          <button onClick={handleExport}>Export</button>
          <button
            disabled={!exportData}
            onClick={() => handleImport(exportData)}
          >
            Import
          </button>
        </div>
        <textarea
          onChange={e => handleDataChange(e.target.value)}
          value={exportData}
        />
        <CopyToClipboard text={exportData}>
          <button disabled={!exportData}>Copy to clipboard</button>
        </CopyToClipboard>
      </li>
    </ul>
  </div>
);

ImportExport.propTypes = {
  handleExport: PropTypes.func.isRequired,
  handleImport: PropTypes.func.isRequired,
  handleDataChange: PropTypes.func.isRequired,
  exportData: PropTypes.string
};

export default ImportExport;
