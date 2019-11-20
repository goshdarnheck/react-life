/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { PureComponent } from "react";
import PropTypes from "prop-types";

import { CELL_ALIVE } from "../lib/constants";

class Cell extends PureComponent {
  render() {
    const props = this.props;
    const style = {
      backgroundColor:
        props.alive === CELL_ALIVE
          ? "hsl(" + props.hue + ", 100%, 50%)"
          : "#222",
      height: 1 * props.zoom,
      width: 1 * props.zoom
    };

    return (
      <i
        css={css`
          display: block;
          text-align: center;

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
  }
}

Cell.propTypes = {
  zoom: PropTypes.number.isRequired,
  handleCellClick: PropTypes.func.isRequired
};

export default Cell;
