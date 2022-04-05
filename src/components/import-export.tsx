import React, { FunctionComponent } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

interface importExportProps {
  handleExport: () => void;
  handleImport: (data: string) => void;
  handleDataChange: (event: string) => void;
  exportData: string;
}

const ImportExport: FunctionComponent<importExportProps> = ({
  handleExport,
  handleImport,
  handleDataChange,
  exportData,
}) => (
  <div className="import-export">
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
          onChange={(e) => handleDataChange(e.target.value)}
          value={exportData}
        />
        <CopyToClipboard text={exportData}>
          <button disabled={!exportData}>Copy to clipboard</button>
        </CopyToClipboard>
      </li>
    </ul>
  </div>
);

export default ImportExport;
