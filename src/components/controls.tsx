import { FunctionComponent, memo } from "react";
import { CustomCheckbox } from "@reach/checkbox";
import Stepper from "./stepper";
import "@reach/checkbox/styles.css";

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
  handleChangeSpeed: (speed: number) => void;
  speed: number;
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
        <button className="button" title="Clear grid" onClick={props.clear}>Clear</button>
      </li>
    </ul>
    <div className="controls__game">
      <div>
        <Stepper
          label="Speed"
          value={props.speed}
          changeValue={props.handleChangeSpeed}
          step={50}
          min={450}
          max={950}
          getAriaValueText={() => `${1000 - props.speed}ms`}
        />
      </div>
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
          <label>
            <span>Torus</span>
            <CustomCheckbox checked={props.torusMode} onChange={props.toggleTorusMode} />
          </label>
        </div>
        <div>
          <label>
            <span>Mutants</span>
            <CustomCheckbox checked={props.mutantMode} onChange={props.toggleMutantMode} />
          </label>
        </div>
      </div>
    </div>
  </div>
));

export default Controls;
