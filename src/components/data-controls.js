/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const DataControls = ({
  cells,
  saveCells,
  loadCells,
  savedCells,
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
        margin-bottom: 0.8em;

        button {
          width: 48%;
        }
      }

      button {
        width: 100%;
      }

      textarea {
        width: 100%;
      }
    `}
  >
    <h2>Data Controls</h2>
    <ul>
      <li>
        <div>
          <button
            onClick={saveCells}
            title="Save Cell State"
            disabled={cells === null || Object.keys(cells).length === 0}
          >
            Save
          </button>
          <button
            onClick={loadCells}
            title="Load Cell State"
            disabled={
              savedCells === null || Object.keys(savedCells).length === 0
            }
          >
            Load
          </button>
        </div>
      </li>
      <li>
        <div>
          <button onClick={handleExport}>Export</button>
          <button onClick={() => handleImport(exportData)}>Import</button>
        </div>
        <textarea onChange={e => handleDataChange(e.target.value)} value={exportData} />
        <button>Clear</button>
      </li>
    </ul>
  </div>
);

export default DataControls;
