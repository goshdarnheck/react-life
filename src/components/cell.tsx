/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { memo } from "react";
import { FunctionComponent } from "react";

interface cellProps {
  alive: boolean;
  hue: number;
  cellKey: string;
  x: number;
  y: number;
  handleCellClick: (cellKey: string) => void;
}

const Cell: FunctionComponent<cellProps> = memo((props) => {
  const style = {
    backgroundColor:
      props.alive === true ? "hsl(" + props.hue + ", 100%, 50%)" : "#222",
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

export default Cell;
