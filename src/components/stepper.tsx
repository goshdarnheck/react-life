import { FunctionComponent, memo } from "react";
import { Slider } from "@reach/slider"
import "@reach/slider/styles.css";

interface stepperProps {
  label: string;
  value: number;
  changeValue: (newSize: number) => void;
  step: number;
  min: number;
  max: number;
  getAriaValueText: () => string;
}

const Stepper: FunctionComponent<stepperProps> = ({
  label,
  value,
  changeValue,
  step,
  min,
  max,
  getAriaValueText
}) => {
  return (
    <div className="stepper">
      <div className="stepper__label">
        {label}
      </div>
      <div>
        <Slider
          getAriaLabel={() => label}
          getAriaValueText={getAriaValueText}
          min={min}
          max={max}
          step={step}
          onChange={newValue => changeValue(newValue)}
          value={value}
        />
      </div>
    </div>
  );
};

export default memo(Stepper);
