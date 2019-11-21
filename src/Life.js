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
  state = {
    cells: {},
    speed: this.props.speed,
    paused: this.props.paused
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
      newCells[`${data[i].x}|${data[i].y}`] = { hue: 0 };
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
        paused: Object.entries(cells).length === 0 && cells.constructor === Object
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

  render() {
    let cells = [];

    for (let y = 0 - this.props.size / 2; y < this.props.size / 2; y++) {
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
