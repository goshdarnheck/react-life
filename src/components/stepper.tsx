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
}

const Stepper: FunctionComponent<stepperProps> = ({
  label,
  value,
  changeValue,
  step,
  min,
  max
}) => {
  return (
    <div className="stepper">
      <div className="stepper__label">
        {label}
      </div>
      <div className="stepper__controls">
        <button
          aria-label={`Decrease ${label}`}
          disabled={!(value - step >= min)}
          onClick={() => changeValue(value - step)}
        >
          &lt;
        </button>
        <span>
          <Slider
            min={min}
            max={max}
            step={step}
            onChange={newValue => changeValue(newValue)}
            value={value}
          />
        </span>
        <button
          aria-label={`Increase ${label}`}
          disabled={!(value + step <= max)}
          onClick={() => changeValue(value + step)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default memo(Stepper);
