/** @jsx jsx */
import { jsx, css } from "@emotion/core";

const Stepper = ({
  label,
  value,
  formattedValue,
  values,
  unit,
  changeValue
}) => {
  const index = values.indexOf(value);
  const decrease = index !== 0 ? values[index - 1] : null;
  const increase = index !== values.length ? values[index + 1] : null;

  return (
    <div css={css``}>
      <div
        css={css`
          margin-bottom: 0.2em;
          text-align: center;
        `}
      >
        {label}
      </div>
      <div
        css={css`
          display: flex;

          button {
            width: 2em;
          }

          span {
            background-color: #333;
            flex-grow: 1;
            line-height: 1.5em;
            text-align: center;
            vertical-align: center;
          }
        `}
      >
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

export default Stepper;
