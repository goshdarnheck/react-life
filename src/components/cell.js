/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { memo } from "react";
import PropTypes from "prop-types";

const Cell = memo(props => {
  const style = {
    backgroundColor:
      props.alive === true ? "hsl(" + props.hue + ", 100%, 50%)" : "#222",
    height: props.cellSize,
    width: props.cellSize
  };

  return (
    <button
      css={css`
        border: 0;
        display: block;
        text-align: center;
        padding: 0;

        &.dead {
          box-shadow: inset 0 0 0 1px #333;
        }

        &.alive {
          box-shadow: none;
        }

        &:hover {
          cursor: none;
          outline: 2px dotted white;
          z-index: 1;
        }
      `}
      onClick={() => props.handleCellClick(props.x, props.y)}
      className={props.alive ? "alive" : "dead"}
      style={style}
    />
  );
});

Cell.propTypes = {
  alive: PropTypes.bool.isRequired,
  hue: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  handleCellClick: PropTypes.func.isRequired
};

export default Cell;
