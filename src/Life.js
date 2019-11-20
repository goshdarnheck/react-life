import React, { Component } from "react";
import PropTypes from "prop-types";
import Sidebar from "./components/sidebar";
import Grid from "./components/grid";
import Controls from "./components/controls";
import Info from "./components/info";
import Examples from "./components/examples";
import { CELL_EMPTY, CELL_ALIVE } from "./lib/constants";

class Life extends Component {
  constructor(props) {
    super(props);

    this.state = {
      grid: this.buildGrid(),
      generation: 0,
      speed: this.props.speed,
      paused: this.props.paused,
      hue: 0,
      exportData: []
    };
  }

  componentDidMount() {
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
      hue: 0
    });
  };

  handleImportClick = () => {
    this.setState(prevState => {
      return {
        showImport: !prevState.showImport
      };
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
      showImport: false,
      grid: newGrid,
      hue: 0,
      generation: 0,
      paused: true
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
              }
              break;
            case 0:
            case 1:
            case 4:
            default:
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
        hue: nextHue
      };
    });
  }

  render() {
    return (
      <div className="Life">
        <Grid
          grid={this.state.grid}
          size={this.props.size}
          zoom={this.props.zoom}
          handleCellClick={this.handleCellClick}
        />
        <Sidebar>
          <Info generation={this.state.generation} speed={this.state.speed} />
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
          <Examples
            handleSelectExample={this.handleSelectExample}
          />
        </Sidebar>
      </div>
    );
  }
}

Life.propTypes = {
  size: PropTypes.number.isRequired, // todo - default value
  zoom: PropTypes.number.isRequired, // todo - default value
  speed: PropTypes.number, // todo - default value
  paused: PropTypes.bool // todo - default value
};

export default Life;
