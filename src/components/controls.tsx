import { FunctionComponent } from "react";

interface controlsProps {
  loadCells: () => void;
  saveCells: () => void;
  play: () => void;
  pause: () => void;
  clear: () => void;
  paused: boolean;
  savedCells?: { [key: string]: { hue: number } };
}

const Controls: FunctionComponent<controlsProps> = (props) => (
  <div className="controls">
    <ul>
      <li className="controls__state">
        <button
          onClick={props.loadCells}
          title="Load saved state"
          disabled={
            props.savedCells === null ||
            (props.savedCells && Object.keys(props.savedCells).length === 0)
          }
        >
          Load
        </button>
        <button onClick={props.saveCells}>Save</button>
        <button
          title="Clear grid and reset stats"
          onClick={props.clear}
        >
          Reset
        </button>
      </li>
      <li>
        {props.paused ? (
          <button onClick={props.play} disabled={!props.paused}>
            ► Play
          </button>
        ) : (
          <button onClick={props.pause} disabled={props.paused}>
            ❚❚ Pause
          </button>
        )}
      </li>
    </ul>
  </div>
);

export default Controls;
