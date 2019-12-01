/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { SPEEDS, CELL_SIZES, GRID_SIZES } from "../lib/constants";
import Stepper from "./stepper";

const Controls = props => (
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
    <h2>Controls</h2>
    <ul>
      <li
        css={css`
          display: flex;
          justify-content: space-between;

          button {
            width: 48%;
          }
        `}
      >
        {props.paused ? (
          <button onClick={props.handlePlayClick} disabled={!props.paused}>
            ► Play
          </button>
        ) : (
          <button onClick={props.handlePauseClick} disabled={props.paused}>
            ❚❚ Pause
          </button>
        )}
        <button disabled={!props.clearable} onClick={props.handleClearClick}>⨯ Clear</button>
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
