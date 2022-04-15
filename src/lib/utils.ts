interface Cell {
  hue: number;
}

interface Cells {
  [key: string]: Cell;
}

export const calculateNeighbours = (
  cells: Cells,
  x: number,
  y: number,
  torusMode: boolean,
  yStart: number,
  yEnd: number,
  xStart: number,
  xEnd: number
): number => {
  let count = 0;

  if (cells[`${x - 1}|${y}`]) {
    count++;
  }

  if (cells[`${x + 1}|${y}`]) {
    count++;
  }

  if (cells[`${x}|${y - 1}`]) {
    count++;
  }

  if (cells[`${x}|${y + 1}`]) {
    count++;
  }

  if (cells[`${x - 1}|${y - 1}`]) {
    count++;
  }

  if (cells[`${x + 1}|${y + 1}`]) {
    count++;
  }

  if (cells[`${x + 1}|${y - 1}`]) {
    count++;
  }

  if (cells[`${x - 1}|${y + 1}`]) {
    count++;
  }

  if (torusMode) {
    if (x === xStart) {
      if (cells[`${xEnd}|${y}`]) {
        count++;
      }
  
      if (cells[`${xEnd}|${y + 1}`]) {
        count++;
      }
    
      if (cells[`${xEnd}|${y - 1}`]) {
        count++;
      }
    }
  
    if (x === xEnd) {
      if (cells[`${xStart}|${y}`]) {
        count++;
      }
  
      if (cells[`${xStart}|${y + 1}`]) {
        count++;
      }
    
      if (cells[`${xStart}|${y - 1}`]) {
        count++;
      }
    }
  
    if (y === yStart) {
      if (cells[`${x}|${yEnd}`]) {
        count++;
      }
  
      if (cells[`${x + 1}|${yEnd}`]) {
        count++;
      }
    
      if (cells[`${x - 1}|${yEnd}`]) {
        count++;
      }
    }
  
    if (y === yEnd) {
      if (cells[`${x}|${yStart}`]) {
        count++;
      }
  
      if (cells[`${x + 1}|${yStart}`]) {
        count++;
      }
    
      if (cells[`${x - 1}|${yStart}`]) {
        count++;
      }
    }
  }

  return count;
};

