import { FunctionComponent, memo } from "react";

interface stepperProps {
  label: string;
  value: number;
  formattedValue?: string;
  values: number[];
  unit?: string;
  changeValue: (newSize: number) => void;
}

const Stepper: FunctionComponent<stepperProps> = ({
  label,
  value,
  formattedValue,
  values,
  unit,
  changeValue,
}) => {
  const index = values.indexOf(value);
  const decrease = index !== 0 ? values[index - 1] : values[index];
  const increase = index !== values.length ? values[index + 1] : values[index];

  return (
    <div className="stepper">
      <div className="stepper__label">
        {label}
      </div>
      <div className="stepper__controls">
        <button
          aria-label={`Decrease ${label}`}
          disabled={!decrease}
          onClick={() => changeValue(decrease)}
        >
          &lt;
        </button>
        <span>
          {formattedValue ? formattedValue : value}
          {unit}
        </span>
        <button
          aria-label={`Increase ${label}`}
          disabled={!increase}
          onClick={() => changeValue(increase)}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default memo(Stepper);
