export const calculateNeighbours = (cells, x, y) => {
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

  return count;
};