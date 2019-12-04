/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
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
              props.savedCells === null || Object.keys(props.savedCells).length === 0
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
        <button title="Clear grid" disabled={!props.clearable} onClick={props.handleClearClick}>
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

Controls.propTypes = {
  handleLoadCells: PropTypes.func.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handlePauseClick: PropTypes.func.isRequired,
  handleClearClick: PropTypes.func.isRequired,
  handleChangeSpeed: PropTypes.func.isRequired,
  handleChangeCellSize: PropTypes.func.isRequired,
  handleChangeGridSize: PropTypes.func.isRequired,
  paused: PropTypes.bool.isRequired,
  speed: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  gridSize: PropTypes.number.isRequired,
  clearable: PropTypes.bool.isRequired,
  savedCells: PropTypes.object
};


export default Controls;
