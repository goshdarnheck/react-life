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
      <li>
        <button onClick={props.saveCells}>Save</button>
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
        <button
          title="Clear grid"
          disabled={!props.clearable}
          onClick={props.clear}
        >
          ⨯ Clear
        </button>
      </li>
      <li>
        <Stepper
          label="Speed"
          value={props.speed}
          unit="ms"
          changeValue={props.handleChangeSpeed}
          step={100}
          min={100}
          max={1000}
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
          formattedValue={`${props.gridSize}⨯${props.gridSize}`}
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
