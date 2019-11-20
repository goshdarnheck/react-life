import React, { Component } from "react";
import PropTypes from "prop-types";
import Sidebar from "./components/sidebar";
import Grid from "./components/grid";
import Cell from "./components/cell";
import Controls from "./components/controls";
import Info from "./components/info";
import Examples from "./components/examples";
import { CELL_EMPTY, CELL_ALIVE } from "./lib/constants";
import examples from "./lib/examples";

class Life extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: this.buildGrid(),
      speed: this.props.speed,
      paused: this.props.paused,
    };
  }

  componentDidMount() {
    this.importData(examples[0].data)

    this.timerID = setInterval(() => {
      if (this.state.paused === false) {
        this.updateGrid();
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
      grid: this.buildGrid(),
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
    let newGrid = this.buildGrid();

    for (let i = 0, len = data.length; i < len; i++) {
      newGrid[data[i].x][data[i].y].alive = CELL_ALIVE;
      newGrid[data[i].x][data[i].y].hue = 0;
    }

    this.setState({
      grid: newGrid,
      hue: 0,
      generation: 0,
      paused: true,
      births: 0,
      deaths: 0
    });
  };

  handleCellClick = (x, y) => {
    this.setState(prevState => {
      prevState.grid[x][y].alive =
        prevState.grid[x][y].alive === CELL_ALIVE ? CELL_EMPTY : CELL_ALIVE;

      return {
        grid: prevState.grid
      };
    });
  };

  getAliveNeighbourCount(grid, x, y) {
    let count = 0;

    if (x - 1 >= 0 && grid[x - 1][y].alive === CELL_ALIVE) {
      count++;
    }

    if (x + 1 < this.props.size && grid[x + 1][y].alive === CELL_ALIVE) {
      count++;
    }

    if (y - 1 >= 0 && grid[x][y - 1].alive === CELL_ALIVE) {
      count++;
    }

    if (y + 1 < this.props.size && grid[x][y + 1].alive === CELL_ALIVE) {
      count++;
    }

    if (x - 1 >= 0 && y - 1 >= 0 && grid[x - 1][y - 1].alive === CELL_ALIVE) {
      count++;
    }

    if (
      x + 1 < this.props.size &&
      y - 1 >= 0 &&
      grid[x + 1][y - 1].alive === CELL_ALIVE
    ) {
      count++;
    }

    if (
      x - 1 >= 0 &&
      y + 1 < this.props.size &&
      grid[x - 1][y + 1].alive === CELL_ALIVE
    ) {
      count++;
    }

    if (
      x + 1 < this.props.size &&
      y + 1 < this.props.size &&
      grid[x + 1][y + 1].alive === CELL_ALIVE
    ) {
      count++;
    }

    return count;
  }

  buildGrid() {
    let grid = [];

    for (let x = 0; x < this.props.size; x++) {
      grid[x] = [];

      for (let y = 0; y < this.props.size; y++) {
        grid[x][y] = {
          alive: CELL_EMPTY,
          hue: 0
        };
      }
    }

    return grid;
  }

  updateGrid() {
    this.setState(prevState => {
      let nextGrid = [];
      let nextHue = prevState.hue < 360 ? prevState.hue + 3 : 0;
      let births = prevState.births;
      let deaths = prevState.deaths;

      for (let x = 0; x < this.props.size; x++) {
        nextGrid[x] = [];

        for (let y = 0; y < this.props.size; y++) {
          switch (this.getAliveNeighbourCount(prevState.grid, x, y)) {
            case 2:
              if (prevState.grid[x][y].alive === CELL_ALIVE) {
                nextGrid[x][y] = {
                  alive: CELL_ALIVE,
                  hue: prevState.grid[x][y].hue
                };
              } else {
                nextGrid[x][y] = {
                  alive: CELL_EMPTY,
                  hue: nextHue
                };
              }
              break;
            case 3:
              if (prevState.grid[x][y].alive === CELL_ALIVE) {
                nextGrid[x][y] = {
                  alive: CELL_ALIVE,
                  hue: prevState.grid[x][y].hue
                };
              } else {
                nextGrid[x][y] = {
                  alive: CELL_ALIVE,
                  hue: nextHue
                };
                births++;
              }
              break;
            case 0:
            case 1:
            case 4:
            default:
              if (prevState.grid[x][y].alive === CELL_ALIVE) {
                deaths++;
              }
              nextGrid[x][y] = {
                alive: CELL_EMPTY,
                hue: nextHue
              };
              break;
          }
        }
      }

      return {
        grid: nextGrid,
        generation: prevState.generation + 1,
        hue: nextHue,
        births: births,
        deaths: deaths
      };
    });
  }

  render() {
    let cells = [];

    for (let y = 0; y < this.state.grid.length; y++) {
      for (let x = 0; x < this.state.grid[y].length; x++) {
        let hue = 0;
        let alive = CELL_EMPTY;

        if (this.state.grid[x][y]) {
          hue = this.state.grid[x][y].hue;
          alive = this.state.grid[x][y].alive;
        }

        cells.push(
          <Cell
            handleCellClick={this.handleCellClick}
            key={`${x}-${y}`}
            hue={hue}
            x={x}
            y={y}
            alive={alive}
            zoom={this.props.zoom}
          />
        );
      }
    }

    return (
      <div className="Life">
        <Grid size={this.props.size} zoom={this.props.zoom}>
          {cells}
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
        </Sidebar>
      </div>
    );
  }
}

Life.propTypes = {
  size: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  speed: PropTypes.number,
  paused: PropTypes.bool
};

export default Life;
