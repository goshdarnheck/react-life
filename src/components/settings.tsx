import { FunctionComponent, memo } from "react";
import Stepper from "./stepper";

interface SettingsProps {
  handleChangeGridSize: (newSize: number) => void;
  handleChangeHueStep: (hueStep: number) => void;
  gridSize: number;
  hueStep: number;
}

const Settings: FunctionComponent<SettingsProps> = memo((props) => (
  <div className="settings">
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
