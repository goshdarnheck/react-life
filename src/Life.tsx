import React, { Component } from "react";
import Grid from "./components/grid";
import Cell from "./components/cell";
import Controls from "./components/controls";
import Stats from "./components/stats";
// import Examples from "./components/examples";
import {
  SPEEDS,
  CELL_SIZES,
  GRID_SIZES,
  MAX_HUE,
  HUE_STEP,
} from "./lib/constants";
import examples from "./lib/examples";
import { calculateNeighbours } from "./lib/utils";
import "./css/styles.scss"

interface LifeProps {
  speed: number;
  paused: boolean;
  cellSize: number;
  gridSize: number;
}

interface LifeState {
  cells: { [key: string]: { hue: number } };
  speed: number;
  paused: boolean;
  generation: number;
  hue: number;
  births: number;
  deaths: number;
  cellSize: number;
  gridSize: number;
  savedCells: { [key: string]: { hue: number } };
}

class Life extends Component<LifeProps, LifeState> {
  timerID: number | undefined = undefined;
  state: Readonly<LifeState> = {
    cells: {},
    speed: this.props.speed,
    paused: this.props.paused,
    generation: 0,
    hue: 0,
    births: 0,
    deaths: 0,
    cellSize: this.props.cellSize,
    gridSize: this.props.gridSize,
    savedCells: {}
  };

  componentDidMount() {
    this.importData(examples[0].data);
    this.setGenerationInterval();
  }

  componentWillUnmount() {
    window.clearInterval(this.timerID);
  }

  setGenerationInterval = () => {
    this.timerID = window.setInterval(() => {
      if (this.state.paused === false) {
        this.runNextGeneration();
      }
    }, this.state.speed);
  };

  pause = () => {
    this.setState({ paused: true });
  };

  play = () => {
    this.setState({ paused: false});
  };

  clear = () => {
    this.setState({
      cells: {},
      paused: true,
      generation: 0,
      hue: 0,
      births: 0,
      deaths: 0
    });
  };

  changeSpeed = (speed: number) => {
    if (SPEEDS.includes(speed)) {
      clearInterval(this.timerID);
      this.setState({ speed }, this.setGenerationInterval);
    }
  };

  changeCellSize = (cellSize: number) => {
    if (CELL_SIZES.includes(cellSize)) {
      this.setState({ cellSize });
    }
  };

  changeGridSize = (gridSize: number) => {
    if (GRID_SIZES.includes(gridSize)) {
      this.setState({ gridSize });
    }
  };

  handleSelectExample = (example: number[][]) => {
    this.importData(example);
  };

  importData = (data: number[][]) => {
    let newCells: { [key: string]: { hue: number } } = {};

    for (let i = 0, len = data.length; i < len; i++) {
      newCells[`${data[i][0]}|${data[i][1]}`] = { hue: 0 };
    }

    this.setState({
      cells: newCells,
      hue: 0,
      generation: 0,
      paused: true,
      births: 0,
      deaths: 0
    });
  };

  handleCellClick = (cellKey: string) => {
    this.setState((prevState: LifeState) => {
      let newCells = { ...prevState.cells };

      if (prevState.cells && prevState.cells[cellKey]) {
        delete newCells[cellKey];
      } else {
        newCells[cellKey] = { hue: 0 };
      }

      return {
        cells: newCells,
      };
    });
  };

  runNextGeneration() {
    this.setState((prevState) => {
      const newHue = prevState.hue + HUE_STEP;
      const hue = newHue < MAX_HUE ? newHue : newHue - MAX_HUE;
      const yStart = Math.ceil(this.state.gridSize / 2);
      const yEnd = Math.ceil(0 - this.state.gridSize / 2);
      const xStart = Math.ceil(0 - this.state.gridSize / 2);
      const xEnd = Math.ceil(this.state.gridSize / 2);
      let cells: { [key: string]: { hue: number } } = {};
      let births = prevState.births;
      let deaths = prevState.deaths;

      for (let y = yStart; y > yEnd; y--) {
        for (let x = xStart; x < xEnd; x++) {
          const cellKey = `${x}|${y}`;

          const wasAlive = prevState.cells[cellKey] ? true : false;
          const neighbours = calculateNeighbours(prevState.cells, x, y);

          switch (neighbours) {
            case 2:
              if (wasAlive) {
                cells[cellKey] = prevState.cells[cellKey];
              }
              break;
            case 3:
              if (!wasAlive) {
                cells[cellKey] = { hue };
                births++;
              } else {
                cells[cellKey] = prevState.cells[cellKey];
              }
              break;
            case 0:
            case 1:
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
        generation: prevState.generation + 1,
        cells,
        hue,
        births,
        deaths,
        paused:
          Object.entries(cells).length === 0 && cells.constructor === Object,
      };
    });
  }

  loadCells = () => {
    this.setState((prevState: LifeState) => {
      return {
        cells: prevState.savedCells,
        hue: 0,
        generation: 0,
        paused: true,
        births: 0,
        deaths: 0,
        speed: prevState.speed,
        cellSize: prevState.cellSize,
        gridSize: prevState.gridSize,
        savedCells: prevState.savedCells
      };
    });
  };

  saveCells = () => {
    this.setState(prevState => ({ savedCells: prevState.cells }));
  }

  getCellList = () => {
    const yStart = Math.ceil(this.state.gridSize / 2);
    const yEnd = Math.ceil(0 - this.state.gridSize / 2);
    const xStart = Math.ceil(0 - this.state.gridSize / 2);
    const xEnd = Math.ceil(this.state.gridSize / 2);
    let cells = [];

    for (let y = yStart; y > yEnd; y--) {
      for (let x = xStart; x < xEnd; x++) {
        const cellKey = `${x}|${y}`;
        let hue = 0;
        let alive = false;

        if (this.state.cells[cellKey]) {
          hue = this.state.cells[cellKey].hue;
          alive = true;
        }

        cells.push(
          <Cell
            handleCellClick={this.handleCellClick}
            key={cellKey}
            cellKey={cellKey}
            x={x}
            y={y}
            hue={hue}
            alive={alive}
          />
        );
      }
    }

    return cells;
  };

  render() {
    return (
      <div className="app">
        <div className="panel">
          <h1>React Life</h1>
          <Stats
            generation={this.state.generation}
            births={this.state.births}
            deaths={this.state.deaths}
          />
          <Controls
            pause={this.pause}
            play={this.play}
            clear={this.clear}
            paused={this.state.paused}
            speed={this.state.speed}
            handleChangeSpeed={this.changeSpeed}
            handleChangeCellSize={this.changeCellSize}
            handleChangeGridSize={this.changeGridSize}
            cellSize={this.state.cellSize}
            gridSize={this.state.gridSize}
            clearable={
              Object.keys(this.state.cells).length > 0 ? true : false
            }
            savedCells={this.state.savedCells}
            loadCells={this.loadCells}
            saveCells={this.saveCells}
          />
        </div>
        <Grid size={this.state.gridSize} cellSize={this.state.cellSize}>
          {this.getCellList()}
        </Grid>
      </div>
    );
  }
}

export default Life;
