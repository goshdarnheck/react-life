/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { FunctionComponent } from "react";
import { SPEEDS, CELL_SIZES, GRID_SIZES } from "../lib/constants";
import Stepper from "./stepper";

interface controlsProps {
  handleLoadCells: () => void;
  handlePlayClick: () => void;
  handlePauseClick: () => void;
  handleClearClick: () => void;
  handleChangeSpeed: () => void;
  handleChangeCellSize: (newSize: number) => void;
  handleChangeGridSize: (newSize: number) => void;
  paused: boolean;
  speed: number;
  cellSize: number;
  gridSize: number;
  clearable: boolean;
  savedCells: object;
}

const Controls: FunctionComponent<controlsProps> = (props) => (
  <div
    css={css`
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      li {
        margin-bottom: 0.8em;
      }
    `}
  >
    <ul>
      <li
        css={css`
          display: flex;
          justify-content: space-between;

          button {
            width: 32%;
          }
        `}
      >
        <button
          onClick={props.handleLoadCells}
          title="Reload last paused cell state"
          disabled={
            props.savedCells === null ||
            Object.keys(props.savedCells).length === 0
          }
        >
          ⟲ Back
        </button>
        {props.paused ? (
          <button onClick={props.handlePlayClick} disabled={!props.paused}>
            ► Play
          </button>
        ) : (
          <button onClick={props.handlePauseClick} disabled={props.paused}>
            ❚❚ Pause
          </button>
        )}
        <button
          title="Clear grid"
          disabled={!props.clearable}
          onClick={props.handleClearClick}
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
