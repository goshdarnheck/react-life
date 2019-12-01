/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { memo } from "react";
import PropTypes from "prop-types";

const Cell = memo(props => {
  const style = {
    backgroundColor:
      props.alive === true ? "hsl(" + props.hue + ", 100%, 50%)" : "#222"
  };

  return (
    <button
      css={css`
        border: 0;
        display: block;
        padding: 0;
        text-align: center;

        &.dead {
          box-shadow: inset 0 0 0 1px #333;
        }

        &.alive {
          box-shadow: none;
        }

        &:focus {
          outline: 1px dotted white;
          z-index: 1;
        }

        &:hover {
          cursor: none;
          outline: 2px dotted white;
          z-index: 1;
        }
      `}
      aria-label={`${props.x}, ${props.y}: ${props.alive ? "alive" : "dead"}`}
      title={`${props.x}, ${props.y}`}
      onClick={() => props.handleCellClick(props.cellKey)}
      className={props.alive ? "alive" : "dead"}
      style={style}
    />
  );
});

Cell.propTypes = {
  alive: PropTypes.bool.isRequired,
  hue: PropTypes.number.isRequired,
  cellKey: PropTypes.string.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  handleCellClick: PropTypes.func.isRequired
};

export default Cell;
