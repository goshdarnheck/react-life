/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { SPEEDS } from "../lib/constants";

const Controls = props => {
  const speedIndex = SPEEDS.indexOf(props.speed);
  const decreaseSpeed = speedIndex !== 0 ? SPEEDS[speedIndex - 1] : null;
  const increaseSpeed =
    speedIndex !== SPEEDS.length ? SPEEDS[speedIndex + 1] : null;

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
      `}
    >
      <h2>Controls</h2>
      <ul>
        <li>
          <div>Speed</div>
          <div
            css={css`
              display: flex;

              button {
                width: 2em;
              }

              span {
                flex-grow: 1;
                text-align: center;
                vertical-align: center;
              }
            `}
          >
            <button
              aria-label="Decrease speed"
              disabled={!decreaseSpeed}
              onClick={() => props.handleChangeSpeed(decreaseSpeed)}
            >
              &lt;
            </button>
            <span> {props.speed}ms</span>
            <button
              aria-label="Increase speed"
              disabled={!increaseSpeed}
              onClick={() => props.handleChangeSpeed(increaseSpeed)}
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
