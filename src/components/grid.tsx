import React, { FunctionComponent } from "react";

interface gridProps {
  children: React.ReactNode;
  size: number;
  cellSize: number;
}

const Grid: FunctionComponent<gridProps> = ({ size, cellSize, children }) => {
  let style = {
    width: size * cellSize,
    height: size * cellSize,
    gridTemplateColumns: `repeat(${size}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${size}, ${cellSize}px)`,
  };

  return (
    <div className="grid">
      <div style={style}>{children}</div>
    </div>
  );
};

export default Grid;
