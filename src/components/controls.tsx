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
  mutantMode: boolean;
  toggleMutantMode: () => void;
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
    <div className="controls__game">
      <div className="controls__life">
        <button className={`button ${props.paused ? 'paused' : 'playing'}`} onClick={props.paused ? props.play : props.pause}>
          <span>
            <span>►</span>
            <span>Play</span>
          </span>
          <span>/</span>
          <span>
            <span>❚❚</span>
            <span>Pause</span>
          </span>
        </button>
      </div>
      <div className="controls__modifiers">
        <div>
          <label htmlFor="torus">Torus</label>
          <input id="torus" type="checkbox" checked={props.torusMode} onChange={props.toggleTorusMode} />
        </div>
        <div>
          <label htmlFor="mutant">Mutants</label>
          <input id="mutant" type="checkbox" checked={props.mutantMode} onChange={props.toggleMutantMode} />
        </div>
      </div>
    </div>
  </div>
));

export default Controls;
