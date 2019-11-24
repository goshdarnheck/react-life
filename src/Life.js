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
import Examples from "./components/examples";
import { CELL_EMPTY, CELL_ALIVE } from "./lib/constants";
import examples from "./lib/examples";

class Life extends Component {
  state = {
    cells: {},
    speed: this.props.speed,
    paused: this.props.paused,
    generation: 0,
    hue: 0,
    births: 0,
    deaths: 0
  };

  componentDidMount() {
    this.importData(examples[0].data);

    this.timerID = setInterval(() => {
      if (this.state.paused === false) {
        this.runNextGeneration();
      }
    }, this.state.speed);
  }

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

  handleCellClick = (x, y) => {
    this.setState(prevState => {
      let newCells = { ...prevState.cells };
      const cellKey = `${x}|${y}`;

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
      const hue = prevState.hue < 360 ? prevState.hue + 3 : 0;
      let cells = {};
      let births = prevState.births;
      let deaths = prevState.deaths;

      for (let y = 0 - this.props.size / 2; y < this.props.size / 2; y++) {
        for (let x = 0 - this.props.size / 2; x < this.props.size / 2; x++) {
          const cellKey = `${x}|${y}`;
          const wasAlive = prevState.cells[cellKey] ? true : false;
          const neighbours = this.calculateNeighbours(prevState.cells, x, y);

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

  calculateNeighbours = (cells, x, y) => {
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
    let cells = [];

    for (let y = this.props.size / 2; y > 0 - this.props.size / 2; y--) {
      for (let x = 0 - this.props.size / 2; x < this.props.size / 2; x++) {
        const cellKey = `${x}|${y}`;
        let hue = 0;
        let alive = CELL_EMPTY;

        if (this.state.cells[cellKey]) {
          hue = this.state.cells[cellKey].hue;
          alive = CELL_ALIVE;
        }

        cells.push(
          <Cell
            handleCellClick={this.handleCellClick}
            key={`${x}-${y}`}
            hue={hue}
            x={x}
            y={y}
            alive={alive}
            cellSize={this.props.cellSize}
          />
        );
      }
    }

    return cells;
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
            height: 100vh;
          `}
        >
          <Grid size={this.props.size} cellSize={this.props.cellSize}>
            {this.getCellList()}
          </Grid>
          <Sidebar>
            <Info
              generation={this.state.generation}
              speed={this.state.speed}
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
            />
            <Examples handleSelectExample={this.handleSelectExample} />
            <button
              css={css`
                opacity: 0.5;
                transition: opacity 0.3s;
                width: 100%;

                &:hover {
                  opacity: 1;
                }
              `}
              onClick={this.handleExport}
            >
              Export to Console
            </button>
          </Sidebar>
          <Footer />
        </div>
      </div>
    );
  }
}

Life.propTypes = {
  size: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  speed: PropTypes.number,
  paused: PropTypes.bool
};

export default Life;
