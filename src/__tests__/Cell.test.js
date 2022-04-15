import Cell from "../components/cell";
import renderer from "react-test-renderer";

test("Cell renders correctly when not alive", () => {
  const component = renderer.create(
    <Cell
      alive={false}
      hue={0}
      cellKey={"0|0"}
      x={0}
      y={0}
      handleCellClick={() => {}}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Cell renders correctly when alive", () => {
  const component = renderer.create(
    <Cell
      alive={true}
      hue={0}
      cellKey={"0|0"}
      x={0}
      y={0}
      handleCellClick={() => {}}
    />
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
