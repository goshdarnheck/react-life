import { FunctionComponent, ReactNode } from "react";

interface gridProps {
  children: ReactNode;
  size: number;
  cellSize: number;
  onGridMouseDown: () => void;
  onGridMouseUp: () => void;
}

const Grid: FunctionComponent<gridProps> = ({ size, cellSize, onGridMouseDown, onGridMouseUp, children }) => {
  let style = {
    width: size * cellSize,
    height: size * cellSize,
    gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
  };

  return (
    <div className="grid">
      <div onMouseDown={onGridMouseDown} onMouseUp={onGridMouseUp} style={style}>{children}</div>
    </div>
  );
};

export default Grid;
