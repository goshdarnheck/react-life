import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from './Grid';
import Controls from './Controls';
import {
    CELL_EMPTY,
    CELL_ALIVE
} from './constants';

class Life extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: this.buildGrid(),
            tick: 0,
            speed: this.props.speed,
            paused: this.props.paused
        };

        this.handleCellClick = this.handleCellClick.bind(this);
        this.handlePauseClick = this.handlePauseClick.bind(this);
        this.handlePlayClick = this.handlePlayClick.bind(this);
        this.handleClearClick = this.handleClearClick.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => {
                if (this.state.paused === false) {
                    this.updateGrid();
                }
            },
            this.state.speed
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    handlePauseClick() {
        this.setState({
            paused: true
        });
    }

    handlePlayClick() {
        this.setState({
            paused: false
        });
    }

    handleClearClick() {
        this.setState({
            grid: this.buildGrid()
        });
    }

    handleCellClick(x, y) {
        this.setState(function(prevState, props) {
            prevState.grid[x][y] = (prevState.grid[x][y] === CELL_ALIVE) ? CELL_EMPTY : CELL_ALIVE;

            return {
                grid: prevState.grid
            };
        });        
    }

    getAliveNeighbourCount(grid, x, y) {
        let count = 0;

        if (x - 1 >= 0 && grid[x - 1][y] === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && grid[x + 1][y] === CELL_ALIVE) {
            count++;
        }

        if (y - 1 >= 0 && grid[x][y - 1] === CELL_ALIVE) {
            count++;
        }

        if (y + 1 < this.props.size && grid[x][y + 1] === CELL_ALIVE) {
            count++;
        }

        if (x - 1 >= 0 && y - 1 >= 0 && grid[x - 1][y - 1] === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && y - 1 >= 0 && grid[x + 1][y - 1] === CELL_ALIVE) {
            count++;
        }

        if (x - 1 >= 0 && y + 1 < this.props.size && grid[x - 1][y + 1] === CELL_ALIVE) {
            count++;
        }

        if (x + 1 < this.props.size && y + 1 < this.props.size && grid[x + 1][y + 1] === CELL_ALIVE) {
            count++;
        }

        return count;
    }

    buildGrid() {
        let grid = [];

        for (let x = 0; x < this.props.size; x++) {
            grid[x] = [];

            for (let y = 0; y < this.props.size; y++) {
                grid[x][y] = CELL_EMPTY;
            }
        }

        return grid;
    }

    updateGrid() {
        this.setState(function(prevState, props) {
            let nextGrid = [];

            for (let x = 0; x < this.props.size; x++) {
                nextGrid[x] = [];

                for (let y = 0; y < this.props.size; y++) {
                    switch (this.getAliveNeighbourCount(prevState.grid, x, y)) {
                        case 2:
                            if (prevState.grid[x][y] === CELL_ALIVE) {
                                nextGrid[x][y] = CELL_ALIVE;
                            } else {
                                nextGrid[x][y] = CELL_EMPTY;
                            }
                            break;
                        case 3:
                            nextGrid[x][y] = CELL_ALIVE;
                            break;
                        case 0:
                        case 1:
                        case 4:
                        default:
                            nextGrid[x][y] = CELL_EMPTY;
                            break;
                    }
                }
            }

            return {
                grid: nextGrid,
                tick: prevState.tick + 1
            };
        });
    }

    render() {
        return (
            <div>
                <Grid
                    grid={this.state.grid}
                    size={this.props.size}
                    zoom={this.props.zoom}
                    handleCellClick={this.handleCellClick}
                />
                <Controls
                    handlePauseClick={this.handlePauseClick}
                    handlePlayClick={this.handlePlayClick}
                    handleClearClick={this.handleClearClick}
                    paused={this.state.paused}
                />
                <div>
                    <h2>Info</h2>
                    <ul>
                        <li>Tick:{this.state.tick}</li>
                        <li>Speed:{this.state.speed}ms</li>
                        <li><input type="range" /></li>
                    </ul>
                </div>
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
