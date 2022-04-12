import { FunctionComponent } from "react";
import Stepper from "./stepper";

interface controlsProps {
  loadCells: () => void;
  saveCells: () => void;
  play: () => void;
  pause: () => void;
  clear: () => void;
  handleChangeSpeed: (speed: number) => void;
  handleChangeCellSize: (newSize: number) => void;
  handleChangeGridSize: (newSize: number) => void;
  paused: boolean;
  speed: number;
  cellSize: number;
  gridSize: number;
  clearable: boolean;
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
          title="Clear grid"
          disabled={!props.clearable}
          onClick={props.clear}
        >
          Clear
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
      <li>
        <Stepper
          label="Speed"
          value={props.speed}
          changeValue={props.handleChangeSpeed}
          step={50}
          min={0}
          max={950}
        />
      </li>
      <li>
        <Stepper
          label="Zoom"
          value={props.cellSize}
          changeValue={props.handleChangeCellSize}
          step={1}
          min={1}
          max={20}
        />
      </li>
      <li>
        <Stepper
          label="Grid Size"
          value={props.gridSize}
          changeValue={props.handleChangeGridSize}
          step={10}
          min={10}
          max={80}
        />
      </li>
    </ul>
  </div>
);

export default Controls;
