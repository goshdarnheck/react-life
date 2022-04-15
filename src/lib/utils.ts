interface Cell {
  hue: number;
}

interface Cells {
  [key: string]: Cell;
}

interface Generation {
  cells: Cells,
  births: number,
  deaths: number
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

export const runGeneration = (
  prevCells: Cells,
  gridSize: number,
  hue: number,
  torusMode: boolean,
  mutantMode: boolean
): Generation => {
  const yStart = Math.ceil(gridSize / 2);
  const yEnd = Math.ceil(0 - gridSize / 2);
  const xStart = Math.ceil(0 - gridSize / 2);
  const xEnd = Math.ceil(gridSize / 2);

  let cells: { [key: string]: { hue: number } } = {};
  let births = 0;
  let deaths = 0;

  for (let y = yStart; y > yEnd; y--) {
    for (let x = xStart; x < xEnd; x++) {
      const cellKey = `${x}|${y}`;

      const wasAlive = prevCells[cellKey] ? true : false;
      const neighbours = calculateNeighbours(
        prevCells,
        x,
        y,
        torusMode,
        yStart,
        yEnd + 1,
        xStart,
        xEnd - 1
      );

      switch (neighbours) {
        case 2:
          if (wasAlive) {
            cells[cellKey] = prevCells[cellKey];
          }
          break;
        case 3:
          if (!wasAlive) {
            cells[cellKey] = { hue };
            births++;
          } else {
            if (mutantMode) {
              const random = Math.random();
              if (random > 0.999) {
                deaths++;
              } else {
                cells[cellKey] = prevCells[cellKey];
              }
            } else {
              cells[cellKey] = prevCells[cellKey];
            }
          }
          break;
        case 1:
          if (mutantMode) {
            const random = Math.random();
            if (random > 0.999) {
              cells[cellKey] = { hue };
              births++;
            }
          } else if (wasAlive) {
            deaths++;
          }
          break;
        case 0:
        case 4:
        default:
          if (wasAlive) {
            deaths++;
          }
          break;
      }
    }
  }

  return {
    cells,
    births,
    deaths
  }
}
