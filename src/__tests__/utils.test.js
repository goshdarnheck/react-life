import { calculateNeighbours } from "../lib/utils";

it("Calculates neighbours correctly", () => {
  const noCells = {};
  const oneCell = { "1|0": { hue: 0 } };
  const twoCells = { "-1|0": { hue: 0 }, "1|0": { hue: 0 } };
  const threeCells = { "-1|0": { hue: 0 }, "1|0": { hue: 0 }, "0|1": { hue: 0 } };

  expect(calculateNeighbours(noCells, 0, 0)).toEqual(0);
  expect(calculateNeighbours(oneCell, 0, 0)).toEqual(1);
  expect(calculateNeighbours(twoCells, 0, 0)).toEqual(2);
  expect(calculateNeighbours(threeCells, 0, 0)).toEqual(3);
});
