import { memo, FunctionComponent } from "react";

interface cellProps {
  alive: boolean;
  hue: number;
  cellKey: string;
  x: number;
  y: number;
  handleCellClick: (cellKey: string) => void;
  onCellMouseEnter: (cellKey: string) => void;
}

const Cell: FunctionComponent<cellProps> = memo((props) => {
  const style = {
    backgroundColor:
      props.alive === true ? "hsl(" + props.hue + ", 100%, 50%)" : "#222",
  };

  return (
    <button
      onMouseEnter={() => props.onCellMouseEnter(props.cellKey)}
      aria-label={`${props.x}, ${props.y}: ${props.alive ? "alive" : "dead"}`}
      title={`${props.x}, ${props.y}`}
      onClick={() => props.handleCellClick(props.cellKey)}
      className={`cell ${props.alive ? "alive" : "dead"}`}
      style={style}
    />
  );
});

export default Cell;
