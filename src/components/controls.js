/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { SPEEDS, CELL_SIZES } from "../lib/constants";

const Controls = props => {
  const speedIndex = SPEEDS.indexOf(props.speed);
  const decreaseSpeed = speedIndex !== 0 ? SPEEDS[speedIndex - 1] : null;
  const increaseSpeed =
    speedIndex !== SPEEDS.length ? SPEEDS[speedIndex + 1] : null;

  const cellSizeIndex = CELL_SIZES.indexOf(props.cellSize);
  const decreaseCellSize =
    cellSizeIndex !== 0 ? CELL_SIZES[cellSizeIndex - 1] : null;
  const increaseCellSize =
    cellSizeIndex !== CELL_SIZES.length ? CELL_SIZES[cellSizeIndex + 1] : null;

  return (
    <div
      css={css`
        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        button {
          height: 2.4rem;
          width: 100%;
        }

        .spinner {
          display: flex;

          button {
            width: 2em;
          }

          span {
            flex-grow: 1;
            text-align: center;
            vertical-align: center;
          }
        }
      `}
    >
      <h2>Controls</h2>
      <ul>
        <li>
          <div>Speed</div>
          <div className="spinner">
            <button
              aria-label="Decrease Speed"
              disabled={!decreaseSpeed}
              onClick={() => props.handleChangeSpeed(decreaseSpeed)}
            >
              &lt;
            </button>
            <span> {props.speed}ms</span>
            <button
              aria-label="Increase Speed"
              disabled={!increaseSpeed}
              onClick={() => props.handleChangeSpeed(increaseSpeed)}
            >
              &gt;
            </button>
          </div>
        </li>
        <li>
          <div>Cell Size</div>
          <div className="spinner">
            <button
              aria-label="Decrease Cell Size"
              disabled={!decreaseCellSize}
              onClick={() => props.handleChangeCellSize(decreaseCellSize)}
            >
              &lt;
            </button>
            <span> {props.cellSize}px</span>
            <button
              aria-label="Increase Cell Size"
              disabled={!increaseCellSize}
              onClick={() => props.handleChangeCellSize(increaseCellSize)}
            >
              &gt;
            </button>
          </div>
        </li>
        <li>
          <button onClick={props.handlePlayClick} disabled={!props.paused}>
            ► Play
          </button>
        </li>
        <li>
          <button onClick={props.handlePauseClick} disabled={props.paused}>
            ❚❚ Pause
          </button>
        </li>
        <li>
          <button onClick={props.handleClearClick}>⨯ Clear</button>
        </li>
      </ul>
    </div>
  );
};

export default Controls;
