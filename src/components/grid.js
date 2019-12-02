/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

const Grid = ({ size, cellSize, children }) => {
  let style = {
    width: size * cellSize,
    height: size * cellSize,
    gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${size}, ${cellSize}px)`
  };

  return (
    <div
      css={css`
        background-color: #222;
        flex-grow: 1;
        height: 100%;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently supported by Chrome and Opera */
        display: flex;
        align-items: center;
        justify-content: center;

        > div {
          border: 1px solid #333;
          display: grid;
        }

        @media only screen and (min-width: 768px) {
          min-height: 100vh;
        }
      `}
    >
      <div style={style}>{children}</div>
    </div>
  );
};

Grid.propTypes = {
  size: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired
};

export default Grid;
