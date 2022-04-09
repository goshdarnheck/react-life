import { FunctionComponent } from "react";
import { SPEEDS, CELL_SIZES, GRID_SIZES } from "../lib/constants";
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
          values={SPEEDS}
          unit="ms"
          changeValue={props.handleChangeSpeed}
        />
      </li>
      <li>
        <Stepper
          label="Cell Size"
          value={props.cellSize}
          values={CELL_SIZES}
          unit="px"
          changeValue={props.handleChangeCellSize}
        />
      </li>
      <li>
        <Stepper
          label="Grid Size"
          value={props.gridSize}
          formattedValue={`${props.gridSize}⨯${props.gridSize}`}
          values={GRID_SIZES}
          changeValue={props.handleChangeGridSize}
        />
      </li>
    </ul>
  </div>
);

export default Controls;
