import { calculateNeighbours } from "../lib/utils";

it("Calculates neighbours correctly", () => {
  const x = 0;
  const y = 0;
  const noCells = {};
  const oneCell = { "1|0": { hue: 0 } };
  const twoCells = { "-1|0": { hue: 0 }, "1|0": { hue: 0 } };
  const threeCells = {
    "-1|0": { hue: 0 },
    "1|0": { hue: 0 },
    "0|1": { hue: 0 }
  };
  const fourCells = {
    "-1|0": { hue: 0 },
    "1|0": { hue: 0 },
    "0|1": { hue: 0 },
    "0|-1": { hue: 0 }
  };
  const fiveCells = {
    "-1|0": { hue: 0 },
    "1|0": { hue: 0 },
    "0|1": { hue: 0 },
    "0|-1": { hue: 0 },
    "-1|1": { hue: 0 }
  };
  const sixCells = {
    "-1|0": { hue: 0 },
    "1|0": { hue: 0 },
    "0|1": { hue: 0 },
    "0|-1": { hue: 0 },
    "-1|1": { hue: 0 },
    "1|1": { hue: 0 },
  };
  const sevenCells = {
    "-1|0": { hue: 0 },
    "1|0": { hue: 0 },
    "0|1": { hue: 0 },
    "0|-1": { hue: 0 },
    "-1|1": { hue: 0 },
    "1|1": { hue: 0 },
    "-1|-1": { hue: 0 },
  };
  const eightCells = {
    "-1|0": { hue: 0 },
    "1|0": { hue: 0 },
    "0|1": { hue: 0 },
    "0|-1": { hue: 0 },
    "-1|1": { hue: 0 },
    "1|1": { hue: 0 },
    "-1|-1": { hue: 0 },
    "1|-1": { hue: 0 },
  };

  expect(calculateNeighbours(noCells, x, y)).toEqual(0);
  expect(calculateNeighbours(oneCell, x, y)).toEqual(1);
  expect(calculateNeighbours(twoCells, x, y)).toEqual(2);
  expect(calculateNeighbours(threeCells, x, y)).toEqual(3);
  expect(calculateNeighbours(fourCells, x, y)).toEqual(4);
  expect(calculateNeighbours(fiveCells, x, y)).toEqual(5);
  expect(calculateNeighbours(sixCells, x, y)).toEqual(6);
  expect(calculateNeighbours(sevenCells, x, y)).toEqual(7);
  expect(calculateNeighbours(eightCells, x, y)).toEqual(8);
});
