/** @jsx jsx */
import { jsx, css, Global as GlobalEmotion } from "@emotion/core";
import { Component } from "react";
import Sidebar from "./components/sidebar";
import Grid from "./components/grid";
import Cell from "./components/cell";
import Controls from "./components/controls";
import Info from "./components/info";
import Footer from "./components/footer";
import ImportExport from "./components/import-export";
import Examples from "./components/examples";
import {
  SPEEDS,
  CELL_SIZES,
  GRID_SIZES,
  MAX_HUE,
  HUE_STEP,
} from "./lib/constants";
import examples from "./lib/examples";
import { calculateNeighbours } from "./lib/utils";

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
  exportData: string;
}

class Life extends Component<LifeProps, LifeState> {
  timerID?: number = undefined;
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
    savedCells: {},
    exportData: "",
  };

  componentDidMount() {
    this.importData(examples[0].data);
    this.setGenerationInterval();
  }

  setGenerationInterval = () => {
    this.timerID = window.setInterval(() => {
      if (this.state.paused === false) {
        this.runNextGeneration();
      }
    }, this.state.speed);
  };

  componentWillUnmount() {
    window.clearInterval(this.timerID);
  }

  handlePauseClick = () => {
    this.setState({
      paused: true,
    });
  };

  handlePlayClick = () => {
    this.setState((prevState) => ({
      paused: false,
      savedCells: prevState.cells,
    }));
  };

  handleClearClick = () => {
    this.setState({
      cells: {},
      paused: true,
      generation: 0,
      hue: 0,
      births: 0,
      deaths: 0,
    });
  };

  changeSpeed = (speed: number) => {
    if (SPEEDS.includes(speed)) {
      clearInterval(this.timerID);
      this.setState(
        {
          speed,
        },
        this.setGenerationInterval
      );
    }
  };

  changeCellSize = (cellSize: number) => {
    if (CELL_SIZES.includes(cellSize)) {
      this.setState({
        cellSize,
      });
    }
  };

  changeGridSize = (gridSize: number) => {
    if (GRID_SIZES.includes(gridSize)) {
      this.setState({
        gridSize,
      });
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
      deaths: 0,
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

  handleExport = () => {
    const cellKeys = Object.keys(this.state.cells);

    if (cellKeys.length > 0) {
      let exportData = "[";

      cellKeys.forEach((cell) => {
        const cellArr = cell.split("|");
        exportData += `[${cellArr[0]},${cellArr[1]}],`;
      });

      exportData = exportData.substring(0, exportData.length - 1);
      exportData += "]";

      this.setState({ exportData });
    }
  };

  handleImport = (data: string) => {
    const parseErrorMessage =
      "Can't parse import data. An example of the expected format: [[0,0],[0,1]]";
    let parsedData = null;

    try {
      parsedData = JSON.parse(data);

      if (parsedData && Array.isArray(parsedData)) {
        this.importData(parsedData);
      } else {
        alert(parseErrorMessage);
      }
    } catch (e) {
      alert(parseErrorMessage);
    }
  };

  handleDataChange = (data: string) => {
    this.setState({ exportData: data });
  };

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

  saveCells = () => {
    this.setState((prevState: LifeState) => ({ savedCells: prevState.cells }));
  };

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
        savedCells: {},
        exportData: "",
      };
    });
  };

  render() {
    return (
      <div
        css={css`
          position: relative;
        `}
      >
        <GlobalEmotion
          styles={css`
            html {
              background-color: black;
              box-sizing: border-box;
              font-size: 62.5%;
            }

            *,
            *:before,
            :after {
              box-sizing: inherit;
            }

            body {
              color: white;
              background-color: #222;
              font-size: 1.6rem;
              font-family: Consolas, monaco, "Andale Mono", AndaleMono,
                "Lucida Console", "Courier New", monospace;
              margin: 0;
              padding: 0;
            }
          `}
        />
        <div
          css={css`
            display: flex;
            flex-direction: column;

            @media only screen and (min-width: 768px) {
              flex-direction: row;
              min-height: 100vh;
            }
          `}
        >
          <Grid size={this.state.gridSize} cellSize={this.state.cellSize}>
            {this.getCellList()}
          </Grid>
          <Sidebar>
            <Info
              generation={this.state.generation}
              births={this.state.births}
              deaths={this.state.deaths}
            />
            <Controls
              handlePauseClick={this.handlePauseClick}
              handlePlayClick={this.handlePlayClick}
              handleClearClick={this.handleClearClick}
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
              handleLoadCells={this.loadCells}
            />
            <Examples handleSelectExample={this.handleSelectExample} />
            <ImportExport
              handleExport={this.handleExport}
              handleImport={this.handleImport}
              handleDataChange={this.handleDataChange}
              exportData={this.state.exportData}
            />
          </Sidebar>
          <Footer />
        </div>
      </div>
    );
  }
}

export default Life;
