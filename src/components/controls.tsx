import { FunctionComponent, memo } from "react";

interface controlsProps {
  play: () => void;
  pause: () => void;
  clear: () => void;
  paused: boolean;
  openLoadModal: () => void;
  openSaveModal: () => void;
  torusMode: boolean;
  toggleTorusMode: () => void;
}

const Controls: FunctionComponent<controlsProps> = memo((props) => (
  <div className="controls">
    <ul className="controls__state">
      <li>
        <button className="button" title="Load a saved state" onClick={props.openLoadModal} >Load</button>
      </li>
      <li>
        <button className="button" onClick={props.openSaveModal}>Save</button>
      </li>
      <li>
        <button className="button" title="Clear grid and reset stats" onClick={props.clear}>Reset</button>
      </li>
    </ul>
    <div className="controls__life">
      {props.paused ? (
        <button className="button" onClick={props.play} disabled={!props.paused}>
          <span>►</span><span>Play</span>
        </button>
      ) : (
        <button className="button button-on" onClick={props.pause} disabled={props.paused}>
          <span>❚❚</span><span>Pause</span>
        </button>
      )}
    </div>
    <div className="controls__modifiers">
      <label htmlFor="torus">Torus</label>
      <input id="torus" type="checkbox" checked={props.torusMode} onChange={props.toggleTorusMode} />
    </div>
  </div>
));

export default Controls;
