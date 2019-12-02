/** @jsx jsx */
import { jsx, css, Global as GlobalEmotion } from "@emotion/core";
import { Component } from "react";
import PropTypes from "prop-types";
import Sidebar from "./components/sidebar";
import Grid from "./components/grid";
import Cell from "./components/cell";
import Controls from "./components/controls";
import Info from "./components/info";
import Footer from "./components/footer";
import ImportExport from "./components/importexport";
import Examples from "./components/examples";
import {
  SPEEDS,
  CELL_SIZES,
  GRID_SIZES,
  MAX_HUE,
  HUE_STEP
} from "./lib/constants";
import examples from "./lib/examples";
import { calculateNeighbours } from "./lib/utils";

class Life extends Component {
  state = {
    cells: {},
    speed: this.props.speed,
    paused: this.props.paused,
    generation: 0,
    hue: 0,
    births: 0,
    deaths: 0,
    cellSize: this.props.cellSize,
    gridSize: this.props.gridSize,
    savedCells: null
  };

  componentDidMount() {
    this.importData(examples[0].data);
    this.setGenerationInterval();
  }

  setGenerationInterval = () => {
    this.timerID = setInterval(() => {
      if (this.state.paused === false) {
        this.runNextGeneration();
      }
    }, this.state.speed);
  };

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handlePauseClick = () => {
    this.setState({
      paused: true
    });
  };

  handlePlayClick = () => {
    this.setState({
      paused: false
    });
  };

  handleClearClick = () => {
    this.setState({
      cells: {},
      paused: true,
      generation: 0,
      hue: 0,
      births: 0,
      deaths: 0
    });
  };

  changeSpeed = speed => {
    if (SPEEDS.includes(speed)) {
      clearInterval(this.timerID);
      this.setState(
        {
          speed
        },
        this.setGenerationInterval
      );
    }
  };

  changeCellSize = cellSize => {
    if (CELL_SIZES.includes(cellSize)) {
      this.setState({
        cellSize
      });
    }
  };

  changeGridSize = gridSize => {
    if (GRID_SIZES.includes(gridSize)) {
      this.setState({
        gridSize
      });
    }
  };

  handleSelectExample = example => {
    this.importData(example);
  };

  importData = data => {
    let newCells = {};

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

  handleCellClick = cellKey => {
    this.setState(prevState => {
      let newCells = { ...prevState.cells };

      if (prevState.cells[cellKey]) {
        delete newCells[cellKey];
      } else {
        newCells[cellKey] = { hue: 0 };
      }

      return {
        cells: newCells
      };
    });
  };

  runNextGeneration() {
    this.setState(prevState => {
      const hue = prevState.hue < MAX_HUE ? prevState.hue + HUE_STEP : 0;
      const yStart = Math.ceil(this.state.gridSize / 2);
      const yEnd = Math.ceil(0 - this.state.gridSize / 2);
      const xStart = Math.ceil(0 - this.state.gridSize / 2);
      const xEnd = Math.ceil(this.state.gridSize / 2);
      let cells = {};
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
          Object.entries(cells).length === 0 && cells.constructor === Object
      };
    });
  }

  handleExport = () => {
    let exportString = "[";

    Object.keys(this.state.cells).forEach(cell => {
      const cellArr = cell.split("|");
      exportString += `[${cellArr[0]},${cellArr[1]}],`;
    });

    exportString = exportString.substring(0, exportString.length - 1);
    exportString += "]";

    console.log(exportString);
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
    this.setState(prevState => ({ savedCells: prevState.cells }));
  };

  loadCells = () => {
    this.setState(prevState => ({
      cells: prevState.savedCells,
      hue: 0,
      generation: 0,
      paused: true,
      births: 0,
      deaths: 0
    }));
  };

  render() {
    return (
      <div>
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
              min-height: 100vh;
              flex-direction: row;
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
              handleImportClick={this.handleImportClick}
              handleExportClick={this.handleExportClick}
              paused={this.state.paused}
              generation={this.state.generation}
              speed={this.state.speed}
              handleChangeSpeed={this.changeSpeed}
              handleChangeCellSize={this.changeCellSize}
              handleChangeGridSize={this.changeGridSize}
              cellSize={this.state.cellSize}
              gridSize={this.state.gridSize}
              clearable={
                Object.keys(this.state.cells).length > 0 ? true : false
              }
              cells={this.state.cells}
              savedCells={this.state.savedCells}
              saveCells={this.saveCells}
              loadCells={this.loadCells}
            />
            <Examples handleSelectExample={this.handleSelectExample} />
            <ImportExport handleExport={this.handleExport} />
          </Sidebar>
          <Footer />
        </div>
      </div>
    );
  }
}

Life.propTypes = {
  gridSize: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  speed: PropTypes.number,
  paused: PropTypes.bool
};

export default Life;
