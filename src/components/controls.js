/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Controls = props => (
  <div
    css={css`
      ul {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      button {
        width: 100%;
      }
    `}
  >
    <h2>Controls</h2>
    <ul>
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

export default Controls;
