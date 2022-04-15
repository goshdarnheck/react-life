import { FunctionComponent, memo } from "react";
import Stepper from "./stepper";

interface SettingsProps {
  handleChangeSpeed: (speed: number) => void;
  handleChangeCellSize: (newSize: number) => void;
  handleChangeGridSize: (newSize: number) => void;
  handleChangeHueStep: (hueStep: number) => void;
  speed: number;
  cellSize: number;
  gridSize: number;
  hueStep: number;
}

const Settings: FunctionComponent<SettingsProps> = memo((props) => (
  <div className="settings">
    <Stepper
      label="Speed"
      value={props.speed}
      changeValue={props.handleChangeSpeed}
      step={50}
      min={0}
      max={950}
      getAriaValueText={() => `${1000 - props.speed}ms`}
    />
    <Stepper
      label="Zoom"
      value={props.cellSize}
      changeValue={props.handleChangeCellSize}
      step={1}
      min={1}
      max={20}
      getAriaValueText={() => props.cellSize.toString()}
    />
    <Stepper
      label="Grid Size"
      value={props.gridSize}
      changeValue={props.handleChangeGridSize}
      step={10}
      min={10}
      max={80}
      getAriaValueText={() => `${props.gridSize} × ${props.gridSize}`}
    />
    <Stepper
      label="Hue"
      value={props.hueStep}
      changeValue={props.handleChangeHueStep}
      step={0.1}
      min={0}
      max={180}
      getAriaValueText={() => props.hueStep.toString()}
    />
  </div>
));

export default Settings;
